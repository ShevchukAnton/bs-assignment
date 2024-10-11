import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

interface TestData {
    env: string;
    username: string;
    password: string;
}

const localTestData: TestData = {
    env: "http://localhost:8080",
    username: "admin",
    password: "admin"
};

type Environment = 'local';

const envConfig: Record<Environment, TestData> = {
    local: localTestData
};

const currentEnv: Environment = (process.env.NODE_ENV as Environment) || 'local';
const config = envConfig[currentEnv];

export const username = process.env.TEST_USER || getUsername();
export const password = process.env.PASSWORD || getPassword();
export const user = {
    username: username,
    password: password,
};

export const env = config.env;

console.log(`Current environment: ${currentEnv}`);
console.log(`Using username: ${username}`);

function getUsername(): string {
    return config.username;
}

function getPassword(): string {
    return config.password;
}