import Head from 'next/head';
import Board from '@/components/Board';

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <Head>
        <title>Tic Tac Toe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">Tic Tac Toe</h1>
        <Board />
      </main>
    </div>
  );
};

export default Home;
