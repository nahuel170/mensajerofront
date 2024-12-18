import { useEffect,useState } from "react";
import "./App.css";
import Logo from './assets/logo.jpg';


import io from "socket.io-client";
import Chat from "./Chat";
import {
  Image,
  Card,
  Button,
  Form,
  Icon,
  Container,
  Header,
  Divider,
} from "semantic-ui-react";

const socket = io.connect('https://mensajeroback.onrender.com');
function App() {
  const [username, setUsername] = useState("");
  const room = "general";
  const [showChat, setShowChat] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/ruta-de-tu-api`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, [apiUrl]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };
 



  return (
    <div className="background-container">
    <Container >
    <Header textAlign="center" as="h1">
    <Image src={Logo} alt="Logo"  />
    Caminando con Jesús
  </Header>
          <Header textAlign="center"sub>una radio de la iglesia vision de futuro (seccional cordoba)</Header>
  <br />
  <br />
          <p> Bienvenidos a la radio con mas fe. Hicimos esta pagina para que nuestros oyentes puedan interactuar con nosotros en tiempo real y contarnos sus historias y/o pedirnos cadenas de oracion</p>
     
      {!showChat ? (
        <Card fluid >
          <Card.Content header="Unirme al chat" />
          <Card.Content>
            <Form>
              <Form.Field>
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Nombre..."
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Field>
              <Button onClick={joinRoom}>Unirme</Button>
            </Form>
          </Card.Content>
        </Card>
      ) : (
       <Chat socket={socket} username={username} room={room} />
      )}
      <Header textAlign="center" as="h1">
    <Image src={Logo} alt="Logo"  />
    Dejando legado...
     </Header>
  {/* </Header>
       <Header className="header" textAlign="center" as='h1' src={Logo} content='Dejando legado...'  /> */}
        
        <p>Cuando pases por las aguas, yo estaré contigo; y si por los rios, no te anegarán.Cuando pases por el fuego, no te quemaras, ni la llama arderá en ti. Isaias 43:2</p>
         
         <footer >@Iglesiavisiondefuturo</footer>
    </Container>
    </div>
    );
  
}

export default App;
