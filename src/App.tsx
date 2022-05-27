import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Card from './components/card'
import Navbar from './components/navbar'

function App() {
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    getCommits()
  }, []);

  const getCommits = () => {
    axios.get('https://api.github.com/repos/fahadtanwir22/crossroads-group/commits').then((response) => {
      const { data } = response;
      const arrangeData = data.map((commit: any) => {
        let singleCommit: any = {};
        singleCommit.name = commit.commit.author.name
        singleCommit.email = commit.commit.author.email
        singleCommit.date = commit.commit.author.date
        singleCommit.message = commit.commit.message
        singleCommit.html_url = commit.html_url
        return singleCommit;
      })
      setCommits(arrangeData);
    }).catch(error => {
      console.log("This is error :: ", error)
    })
  }

  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto">
     

<div className="grid grid-cols-4 gap-4">
  {commits.map(commit => (
    <Card commit={commit}/>
  ))}
  
</div>
</div>
    </div>
  );
}

export default App;
