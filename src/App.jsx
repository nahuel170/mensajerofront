import { useState } from "react";
import "./App.css";



import io from "socket.io-client";
import Chat from "./Chat";
import {
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
          <Header  textAlign="center" as='h1' image='https://scontent-eze1-1.xx.fbcdn.net/v/t39.30808-6/265169026_5118484278202629_1213970805296064830_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGmcPCCINOyy0Zv2Lb6C_S5SnkPilsw5cBKeQ-KWzDlwKYVzKwbaumtNjUcmZkesYWccv8zpsnZIU1o_bmaBaSH&_nc_ohc=s2PED_NIiR0Q7kNvgEOFO59&_nc_ht=scontent-eze1-1.xx&oh=00_AYCsblBZpANCyYyMIEtKIJtFG6LZ8YaUvtIF26fdwIhj1w&oe=66B89722'  content='Caminando con jesus' />
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
       <Header className="header" textAlign="center" as='h1' image='https://scontent-eze1-1.xx.fbcdn.net/v/t39.30808-6/265169026_5118484278202629_1213970805296064830_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGmcPCCINOyy0Zv2Lb6C_S5SnkPilsw5cBKeQ-KWzDlwKYVzKwbaumtNjUcmZkesYWccv8zpsnZIU1o_bmaBaSH&_nc_ohc=s2PED_NIiR0Q7kNvgEOFO59&_nc_ht=scontent-eze1-1.xx&oh=00_AYCsblBZpANCyYyMIEtKIJtFG6LZ8YaUvtIF26fdwIhj1w&oe=66B89722' content='Dejando legado...'  />
        
        <p>Cuando pases por las aguas, yo estaré contigo; y si por los rios, no te anegarán.Cuando pases por el fuego, no te quemaras, ni la llama arderá en ti. Isaias 43:2</p>
         
         <footer >@Iglesiavisiondefuturo</footer>
    </Container>
    </div>
    );
  
}

export default App;
