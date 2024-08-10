import { useState, useEffect } from 'react'
import twitterLogo from "./assets/twitter-logo.svg"
import './App.css'
import getProvider from './utils/getProvider';
import TEST_GIFS from './test_data/data';

  

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [gifList, setGifList] = useState([])
  
  // Change this up to be your Twitter if you want.
  const TWITTER_HANDLE = 'drjayspeaks';
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

  const isPhantomInstalled = window.phantom?.solana?.isPhantom
  
  // checks if phantom is installed on the browser. Phantom injects a provider if installed on the browser
  
  const provider = getProvider()

  const checkIfWalletConnected = async () => {

    //conect to wallet 

      try{
        const response = await provider.connect(); 
        console.log(
          "Connected with Public Key: ",
          response.publicKey.toString()
        )
        setWalletAddress(response.publicKey.toString())

      } catch (err) {
        console.error("Failed to connect to Phantom Wallet", err)
        throw err
      }

      provider.on("connect", ()=> console.log("connected!"))

  };

  const connectWallet = async () => {
    try{
      const response = await provider.connect(); 
      console.log(
        "Connected with Public Key: ",
        response.publicKey.toString()
      )
      setWalletAddress(response.publicKey.toString())

    } catch (err) {
      console.error("Failed to connect to Phantom Wallet", err)
      throw err
    }

    provider.on("connect", ()=> console.log("connected!"))

};

  const renderNotConnectedContainer=()=>{
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  }

  const onInputChange = (e) =>{
    const { value } = e.target
    setInputValue(value)
  }

  const sendGif = async () => {
    if(inputValue.length > 0){
      console.log("Gif link", inputValue)
      setGifList([...gifList, inputValue])
      setInputValue('')
    } else {
      console.log("Please paste a GIF link")
    }
  }

  //returns a form with the GIFs present

  const renderConnectedContainer = () => {
    return (
      <div className=''>

        <form
        className='flex flex-col mb-6 gap-2'
        onSubmit={(e)=>{
          e.preventDefault()
          sendGif()
        }}>

          <input type='text' placeholder='Enter gif link!' className='border p-1 rounded-md' onChange={onInputChange} value={inputValue} />
          <button type='submit' className='bg-green-400 px-4 py-2 rounded-lg text-white cursor-pointer w-full sm:w-auto '>Submit</button>

        </form>

        <div className='grid grid-cols-3 gap-4'>
          {gifList.map((gif, index)=> {
            return(
              <div key={index} className=''>
                <img src={gif} alt={gif} className='size-32 rounded-md'/>
              </div>

            )
          })}

        </div>

      </div>
    )
  }

  console.log(gifList)

  /* Check to see whether wallet is connected  
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [checkIfWalletConnected]);

  //function which renders GIFs when the wallet is connected 

  useEffect(()=>{
    if(walletAddress){
      console.log("Fetching GIF list...")

      setGifList(TEST_GIFS)
    }

  }, [walletAddress])

  return (
    <main className="mx-auto max-w-7xl">
      <div className="container">
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-3xl">🖼 GIF Portal</p>
          <p className="text-xl">
            View your GIF collection in the metaverse ✨
          </p>
          {walletAddress ? (
            <>
              <p>{`Connected with Wallet Address: ${walletAddress}`}</p>
              {renderConnectedContainer()}
            </>
              ): 
              renderNotConnectedContainer()}

        </div>
        <div className="flex flex-row mt-20 gap-4 items-center justify-center">
          <img 
          alt="Twitter Logo" 
          className="size-5" 
          src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </main>
  );
};

export default App;
