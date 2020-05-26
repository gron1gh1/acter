import axios from 'axios';

const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

console.log(axios);
// Support for Chrome
export const getNPM = (module_name: string) => {
    let jspm_url = `https://dev.jspm.io/${module_name}`;
    return new AsyncFunction('axios', `
            return await axios.get('${jspm_url}')
            .then((responseText) => {
                let parse = responseText.data.split('\\n');
                return parse.filter((v) => {
                    if(v.indexOf('/npm:react@') !== -1)
                        return 0;
                    else if(v.indexOf('/npm:react-dom@') !== -1)
                        return 0;
                    return 1;
                }).join('\\n')
             })
            .then((withoutReact) => withoutReact.replace(/\\/npm/g,'https://dev.jspm.io/npm'))
            .then((withAbsPath) => {
                   let blob_data = new Blob([withAbsPath], {
                      type: 'text/javascript',
                      endings: 'native'
                   });
                   return import(window.URL.createObjectURL(blob_data));
            })
            .then((libInfo) => libInfo.default);`
    )(axios);
}