import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import MenuTop from './menu_top'
import './menu_horizontal.scss'
const MenuHorizontal = ({ children, modulo }) => {
  return (
    <div id="outer-container">
      <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} itemListElement="div">
        <a href="/inicio" className={`${modulo === 'inicio' ? 'btm-item-activo' : ''}`}>Inicio</a>
        <a href="/ventas" className={`${modulo === 'ventas' ? 'btm-item-activo' : ''}`}>Ventas</a>
        <a href="/logout" >Salir</a>
      </Menu>
      <main id="page-wrap">
        <MenuTop />
        {children}
      </main>
    </div>
  )
}
export default MenuHorizontal
