import {Configuration, UsersApi} from "@tramways/users-service-api";

export default function configureUsersApi(config) {
    return new UsersApi(new Configuration(config));
}
