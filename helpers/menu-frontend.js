const getMenuFrontEnd = (role = 'USER' ) =>{
    

    const menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/' },
            { titulo: 'ProgressBar', url: 'progress' },
            { titulo: 'Graficas', url: 'grafica1' },
            { titulo: 'Promesas', url: 'promesas' },
            { titulo: 'RXJS', url: 'rxjs' },
          ]
        },       

        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            { titulo: 'Usuarios', url: 'usuarios' },
            { titulo: 'Hospitales', url: 'hospitales' },
            { titulo: 'Medicos', url: 'medicos' },
          ]
        }
      ]
      let menuEnvio=menu;
      
      if(role!=='ADMIN_ROLE'){
        const menuUser = menu.filter( titulo => titulo.titulo !== 'Mantenimiento' ) 

        menuEnvio = menuUser
      }
      return menuEnvio;
}

module.exports = {
    getMenuFrontEnd
}