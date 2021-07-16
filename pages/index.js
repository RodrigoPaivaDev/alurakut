import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/components/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSideBar(propriedades) {
  return(
    <Box as='aside'>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius:  '8px' }} />
  
      <hr />

    <p>
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>
    </p>
    <hr />

    <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      
  {/*     
      <ul>
        {propriedades.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}`} target="_blank" >
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
            </li>
          )
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuario = 'rodrigopaivadev';
  const [comunidades, setComunidades] = React.useState([]);
  // const comunidades = comunidades [0];
  /// const alteradorDeComunidades/setComunidades = comunidades[1]
  //const comunidades = ['Alurakut'];

  const pessoasFavoritas = [
    'rafaballerini',
    'juunegreiros',
    'fino59', 
    'omariosouto', 
    'marcobrunodev',   
    'diego3g',
    'peas',
    'filipedeschamps',
    'maykbrito',
  ];

  const [seguidores, setSeguidores] = React.useState([]); //useState é para adicionar local para as info tela

  //pegar as info apenas uma vez
  React.useEffect(function() {
    //pega as info da api do github --Method GET--
    const seguidores = fetch('https://api.github.com/users/RodrigoPaivaDev/followers')
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta){
      setSeguidores(respostaCompleta);
    })

    //API GraphQL
    fetch ('https://graphql.datocms.com/', {
      method: 'POST', ///pegando os dados do dato cms e passando para a aplicação
      headers: {
        'Authorization': '5cafd647741dd6b1db5079fe9b8fc1', ///token do dato cms
        'Content-Type':'application/json',
        'Accept':'application/json',
      },
      body:
        JSON.stringify({ "query": `query{
          allCommunities{
            title
            id
            imageUrl
            creatorSlug
          }
        
      }` })
    })
    .then((response) => response.json()) //pega a resposta do fetch e converte para json ### arrow function nao precisa de return para retonar o valor para ser usado
    .then((respostaCompleta) => {
      const comunidadesVindaDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindaDoDato)
      setComunidades(comunidadesVindaDoDato)
    })

  }, [])


  return (
    <>
      <AlurakutMenu />
        <MainGrid>
          <div className="profileArea" style={{ gridArea: 'profileAreas' }}>
            <ProfileSideBar githubUser={usuario}/>
          </div>

          <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
            <Box>
              <h1 className="title">
                Bem vindo, Rodrigo
              </h1>
              <OrkutNostalgicIconSet />
            </Box>

            <Box>
              <h2 className="subTitle">O que vocẽ deseja fazer?</h2>
              {/* função recebendo 'e' como paramentro o 'e' traz varias funcionalidades para utilizar  */}
              <form onSubmit={function handleCriaComunidade(e){
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);


                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: usuario,
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas); 
                })
                //comunidades.push ('ALura Stars');
               
               /*  adiciona um novo elemento em complemento do antigo, é como se fosse uma x += 1 */
              }}>

                <div>
                  <input 
                  placeholder="Qual vai ser o nome da comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da comunidade?"
                  type="text"
                  />
                </div>

                <div>
                  <input 
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  />
                </div>
                <button>
                  Criar comunidade
                </button>
              </form>
            </Box>
          </div>

          <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

            
            <ProfileRelationsBox title="Seguidores" items={seguidores} /> {/*chama a funcao e passa title e items como parametros para ela */ }




            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da comunidade ({pessoasFavoritas.length})
              </h2>
              
              
              <ul>
                {pessoasFavoritas.map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`https://github.com/${itemAtual}`} target="_blank" >
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>



            <ProfileRelationsBoxWrapper>

              <h2 className="smallTitle">
                Comunidades ({comunidades.length})
              </h2>


              <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/comunities/${itemAtual.id}`}>
                        <img src={itemAtual.imageUrl} />
                        <span>{itemAtual.title}</span>
                       
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>

           
          </div>
        </MainGrid>
      </>
  )
}
