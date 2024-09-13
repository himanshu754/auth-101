import owasp from "owasp-password-strength-test";

const passwordStrengthTest = (password: string) => {
    owasp.config({
        allowPassphrases: true,
        maxLength: 128,
        minLength: 8,
        minPhraseLength: 20,
        minOptionalTestsToPass: 4,
    });

    const resultTest = owasp.test(password);
    const hasError = resultTest.errors.length > 0;
    const errMessage = resultTest.errors[0];

    return {
        hasError,
        errMessage,
    };
};

const customPasswordValidator = (pass: string) => {
    const {
        hasError,
        errMessage,
    } = passwordStrengthTest(pass);

    if (hasError)
        throw new Error(errMessage);

    return true;
};

export {
    customPasswordValidator,
};
