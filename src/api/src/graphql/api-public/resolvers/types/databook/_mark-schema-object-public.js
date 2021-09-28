import { nanoid } from 'nanoid'

/**
 * Marking an object as public
 *  => Create a public username/password
 *  => Store these credentials in a Mongo DB as encrypted
 *  => Grant this user read access to the
 *     specified object
 */
export default async (databook, { object }, ctx) => {
  try {
    const { query } = ctx.postgis
    const schema = databook._id.toString()
    const username = `${schema}_public`

    /**
     * If a public user has not already been
     * setup for this databook, do this
     */
    if (!databook.authentication.public) {
      const { Databooks } = await ctx.mongo.collections
      const { encrypt } = ctx.crypto
      const password = nanoid(36)
      await Databooks.findOneAndUpdate(
        {
          _id: databook._id,
        },
        {
          $set: {
            'authentication.public': {
              username,
              password: encrypt(password),
            },
          },
        },
        {
          upsert: false,
          returnDocument: 'after',
        }
      )

      /**
       * Create the postgres user
       */
      await query({
        text: `
        begin;
          create user "${username}" with encrypted password '${password}';
        commit;`,
      })
    }

    /**
     * Grant public read access on the specified table to this user
     */
    await query({
      text: `
      begin;
        grant SELECT on "${schema}"."${object}" to "${username}";
      commit;`,
    })

    return true
  } catch (error) {
    console.error('Unable to mark schema object as public', error)
    return false
  }
}
