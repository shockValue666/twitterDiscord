
import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Descientists Lablist</title>
        <meta
          name="description"
          content="Descientists Whitelist Tool "
        />
      </Head>
      <HomeView />
    </div>
  );
};




export default Home;
