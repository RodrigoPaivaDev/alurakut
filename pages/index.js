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


export default function Home() {
  const usuario = 'rodrigopaivadev';
  const [comunidades, setComunidades] = React.useState([{
    id: '123456',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  // const comunidades = comunidades [0];
  /// const alteradorDeComunidades/setComunidades = comunidades[1]
  //const comunidades = ['Alurakut'];

  const pessoasFavoritas = [
    'rafaballerini',
    'juunegreiros',
    'fino59', 
    'omariosouto', 
    'marcobrunodev', 
    'peas',  
    'diego3g', 
    'filipedeschamps',
    'maykbrito',
  ];

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
                Bem vindo(a)
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
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                }
                // comunidades.push ('ALura Stars');
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
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

            <ProfileRelationsBoxWrapper>

              <h2 className="smallTitle">
                Comunidades ({comunidades.length})
              </h2>


              <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/users/${itemAtual.title}`}>
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                       
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>

         
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da comunidade ({pessoasFavoritas.length})
              </h2>
              
              
              <ul>
                {pessoasFavoritas.map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`https://github.com/${itemAtual}`} >
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
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
