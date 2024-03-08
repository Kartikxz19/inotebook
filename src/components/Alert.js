import React from 'react'

function Alert(props) {
    const capital=(word)=>{
        if(word==='danger')
        {
          word='oops';
        }
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
  return (
    /* We enclose alert in a outer div with specific height of 50 px so that when alert pops up and goes away
    ,our layout is not shifted becoz of that(we allocate alert a set height of 50 px). This is called CLS(cummulative layout shift) and it should be as low as possible for good SEO */
    <div style={{height:"50px"}}>
      {/* /*What && does is --if props.alert isNULL(no alert assigned yet), then div won't be evaluated or rendered, otherwise it will be */}
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong> {capital(props.alert.type)}: {props.alert.msg}</strong>
    </div>}
    </div>
    
  )
}

export default Alert;
