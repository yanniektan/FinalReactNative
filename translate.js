import axios from 'axios';

export const translateLang = async (content, toLang, fromLang) => {

    const options = {
        method: 'GET',
        url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
        params: {
          text: content,
          to: toLang,
          from: fromLang,
        },
        headers: {
          'X-RapidAPI-Key': '146bea2c2cmsh3551ca5facb7102p155382jsne9a777fe5108',
          'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
        }
      };
  
      const response = await axios.request(options).catch(function (error) {
        console.error(error);
    });

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Translate call failed. Response status: " + response.status);
    }

    return response.data;
}