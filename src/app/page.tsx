import Board from "./components/board";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <main className="p-4 pt-10">
      <Board />
    </main>
  );
};

export default Home;
