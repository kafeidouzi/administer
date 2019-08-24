import SMERouter from 'sme-router'

const router = new SMERouter('router-view', 'hash')

import Home from '../controllers/home'
import Position from '../controllers/position'

//sme-router 中间件
//在每次路由切换之前都执行一次
router.use((req,res,next)=>{
    $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
    .parent()
    .addClass('active')
    .siblings()
    .removeClass('active')
})

router.route('/', Home.render)
router.route('/position', Position.render)
router.route('/position_add',Position.add)
router.route('/position_edit',Position.edit)

router.redirect('/')

export default router