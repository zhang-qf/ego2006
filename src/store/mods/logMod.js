export default {
    namespaced:true,
    state: {
        userInfo:{
            name:'',
            token:''
        }
    },
    mutations: {
        xiu(state,obj){
            state.userInfo={
                name:obj.name,
                token:obj.token
            }
        },
        set(state){
            state.userInfo={
                name:'',
                token:''
            }
        }
    },
    actions: {
    },
    modules: {
    }
  }