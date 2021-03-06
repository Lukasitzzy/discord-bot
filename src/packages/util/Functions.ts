import { AitherBot } from '../core/src/client/Client';
import { Api } from './typings/Discord.js.Api';
import { exec } from 'child_process';
import * as crypto from 'crypto';

export function getApi(client: AitherBot): Api {
    return Reflect.get(client, 'api');
}

export function getGitCommit(): Promise<string> {
    return new Promise<string>((res, rej) => {
        exec('git rev-parse HEAD', (err, stdout, stderr) => {
            if (err) {
                return rej(err);
            }
            if (stdout) {
                return res(stdout);
            }
            rej(new Error(stderr));
        });
    });
}


export function createHash(input: string): string {
    return crypto.createHash('sha512').update(input).digest().toString('hex');
}
