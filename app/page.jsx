import RoomCard from "@/components/RoomCard";
import Heading from "@/components/Heading";
import getAllRooms from "./actions/getAllRooms";

export default async function Home() {
  const rooms = await getAllRooms(); 
  return (
    <>
        <Heading title='Avaialble Rooms' />
      {rooms.length > 0 ? (rooms.map((room) => <RoomCard key={room.$id} room={room}/>)) : (<p>No room available at the moment</p>)}
    </>
  );
}
 