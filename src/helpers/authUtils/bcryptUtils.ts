import * as bcrypt from "bcryptjs";

const getHash = (password: string): Promise<string> => new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, (err: Error | null, hash: string) => {
        if (err) {
            reject(err);
        } else {
            resolve(hash);
        }
    });
});

const checkHash = (password: string, hash: string): Promise<boolean> => new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err: Error | null, check: boolean) => {
        if (err) {
            reject(err);
        } else {
            resolve(check);
        }
    });
});

export {
    getHash,
    checkHash,
};
