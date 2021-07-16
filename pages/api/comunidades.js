import { SiteClient } from 'datocms-client';



export default async function recebedorDeRequests(request, response){

    if(request.method === 'POST'){
        const TOKEN = 'bb8fa125619694a6c446a41b001607';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "972795", ///ID model de community lá do datoCMS
            ...request.body,
          /*   title: 'Comunidade teste',
            imageUrl: 'https://github.com/rodrigopaivadev.png',
            creatorSlug: 'rodrigopaivadev' */
        })
        

        console.log(registroCriado);
      
        response.json({
            dados: 'Algum valor',
            registroCriado: registroCriado,
        }) 
        return;
    }


    response.status(404).json({
        message: 'Ainda não tem nada no GET, mas no POST tem!'
    })
}