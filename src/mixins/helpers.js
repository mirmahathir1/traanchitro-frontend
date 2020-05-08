export const formatError = (e)=> {
    console.log('ERROR: ', e);
    console.log('ERROR.RESPONSE: ', e.response);
    if(e && e.response && e.response.data && e.response.data.message){
        return e.response.data.message;
    }else{
        return "Unknown error";
    }
};

export const formatRequest = (url,params,headers)=>{
    console.log("%cREQUESTING TO: "+url,'color: #9400d3');
    console.log("%cPARAMS: ",'color: #9400d3',params);
    if(headers["x-auth"]){
        console.log("%cUSER IS AUTHORIZED",'color: #9400d3');
    }else{
        console.log("%cUSER IS NOT AUTHORIZED",'color: #9400d3');
    }
};