//import './App.css';
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="App">
      <h1>Developer Database</h1>
      <p>
        Catalogs the results of the Stack Exchange 2023 Developer Survery.<br/>
        Contains Responses from over 89k developers from 185 countries.<br/>
      </p>
        Provides usage statistics for:<br/>
        <ul>
          <li>50 programming languages</li> 
          <li>30 databases</li>
          <li>20 cloud platforms</li>
          <li>30 web frameworks</li>
          <li>40 IDEs</li>
          <li>40 asynchronous and synchronous tools</li>
          <li>20 operating systems</li>
          <li>20 AI tools</li>
          <li>and more!</li>
        </ul>
      <h2>Tables</h2>
      <h3><Link to={"/developers"}>Developers</Link></h3>
      <span>Records various demographic information about surveyed developers.</span>
      <h3><Link to={"/languages"}>Languages</Link></h3>
      <span>Records the name of various programming languages.</span>
      <h3><Link to={"/platforms"}>Platforms</Link></h3>
      <span>Records the name of various programming platforms.</span>
      <h3><Link to={"/technologies"}>Technologies</Link></h3>
      <span>Records the name of various programming Technologies.</span>
      <h3><Link to={"/countries"}>Countries</Link></h3>
      <span>Records various facts about the country of each developer surveyed.</span>
      <h3><Link to={"/developer-languages"}>Developer Languages</Link></h3>
      <span>Relates an instance of a language to a developer and records whether they have or want to work with that language.</span>
      <h3><Link to={"/developer-platforms"}>Developer Platforms</Link></h3>
      <span>Relates an instance of a platform to a developer and records whether they have or want to work with that platform.</span>
      <h3><Link to={"/developer-technologies"}>Developer Technologies</Link></h3>
      <span>Relates an instance of a technology to a developer and records whether they have or want to work with that technology.</span>
    </div>
  );
}

export default Home;
