import router from './index'
import store from '../store/index'
router.beforeEach((to, from, next) =>{
    if(to.meta.isLog){
        var token=store.state.logMod.userInfo.token
        if(token){
            next()
        }else{
            next({
                path:'/login'
            })
        }
    }else{
        next()
    }
})