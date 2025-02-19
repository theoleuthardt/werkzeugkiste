import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

interface RequestBody {
    length: string;
    numb: boolean;
    lower: boolean;
    upper: boolean;
    special: boolean;
}

export async function passwordGenerate(app: FastifyInstance) {
    app.post(
        "/api/password-generate",
        async (
            request: FastifyRequest<{ Body: RequestBody }>,
            reply: FastifyReply,
        ) => {
            try {
                const data = request.body;
                if (!data) {
                    return reply.status(400).send({ error: "No length or type declared!" });
                }
                let numArray: string[] = "0123456789".split("");
                let lowerArray: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
                let upperArray: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
                let specialArray: string[] = "!@#$%^&*()_+[]{}|;:,.<>?".split("");
                let passwordArray: string[] = [];

                if(data.numb){
                    passwordArray = passwordArray.concat(numArray);
                }

                if(data.lower){
                    passwordArray = passwordArray.concat(lowerArray);
                }

                if(data.upper){
                    passwordArray = passwordArray.concat(upperArray);
                }

                if(data.special){
                    passwordArray = passwordArray.concat(specialArray);
                }

                let password = "";

                for (let i = 0; i < +data.length; i++) {
                    const ind: number = Math.floor(Math.random() * passwordArray.length);
                    const randomElement: string = passwordArray[ind];
                    password = password.concat(randomElement);
                }

                reply.header("Content-Type", "text/plain").status(200).send(password);
            } catch (error) {
                console.error("Convert error:", error);
                reply.status(500).send({ error: "Error while converting!" });
            }
        },
    );
}