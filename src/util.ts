// Support for Chrome
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

export const getNPM = (module_name : string) => {
    let jspm_url = `https://dev.jspm.io/${module_name}`;
    return  new AsyncFunction(
    `let module = null;
    await import('${jspm_url}').then(res => {
        module = res.default;
    });
    return module;`
    )()
}