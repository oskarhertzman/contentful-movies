export default function createEntry (client, space_id, environment_id, content_type_id, data) {
    return client.getSpace(space_id)
    .then((space) => space.getEnvironment(environment_id))
    .then((environment) => environment.createEntry(content_type_id, {data}))
}