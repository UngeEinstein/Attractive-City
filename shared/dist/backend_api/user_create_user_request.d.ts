/**
 * A request to create a new user in database
 */
export interface UserCreateUserRequest {
    /**
     * The id associated with the user. (From firebase)
     */
    userId: string;
    /**
     * The email associated with the user.
     */
    email: string | null;
}
export declare const userCreateUserRequestSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        userId: {
            description: string;
            type: string;
        };
        email: {
            description: string;
            type: string[];
        };
    };
    required: string[];
    type: string;
};
