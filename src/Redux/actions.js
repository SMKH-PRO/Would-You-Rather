
export const TYPES={
  
  SETSTATE:"SETSTATE"
}


export const setState=(payload)=>({
  type:TYPES.SETSTATE,
  payload:payload
})



export const setTitle=(string)=>({
  type:TYPES.SETSTATE,
  payload:{title:string}
})



