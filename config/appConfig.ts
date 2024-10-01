

const appConfiguration = () => {
  const APP_PORT = parseInt(process.env.APP_PORT) || 3000;

  console.log('APP starting, at port:',APP_PORT);

  return { 
    port: APP_PORT
    // database:{
    //   host:"",
    //   port:"",
    // }
  };
};
  

export default appConfiguration 
// as AppConfig