import React, { Component } from 'react';

import { JuegosService } from '../Service/JuegosService';

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';

import 'primereact/resources/themes/nova-alt/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

export class Juegos extends Component{
  constructor(){
    super();
    this.state = {
        visible: false,
        juego: {
            id: null,
            nombre: null,
            clasificacion: null,
            genero: null,
            fechaCreacion: null,
            desarrollador: null,
            modos: null,
        },
        selectedJuego:{
        }
    };
    this.items = [
        {
          label: 'Crear',
          icon: 'pi pi-fw pi-plus',
          command: () => {this.showSaveDialog()}
        },{
          label: 'Editar',
          icon: 'pi pi-fw pi-pencil',
          command: () => {this.showEditDialog()}
        },{
          label: 'Eliminar',
          icon: 'pi pi-fw pi-trash',
          command: () => {this.delete()}
        }
    ];

    this.juegosService = new JuegosService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);

    this.footer = (
      <div>
        <Button label= 'Confirmar' icon= 'pi pi-check' onClick = {this.save}/>
      </div>
    );
  }

  componentDidMount(){
    this.juegosService.getAll().then(data => this.setState({
      juegos: data
    }));
  }

  save(){
    this.juegosService.save(this.state.juego).then(
      data => {
        this.setState({
          visible: false,
          juego: {
            id: null,
            nombre: null,
            clasificacion: null,
            genero: null,
            fechaCreacion: null,
            desarrollador: null,
            modos: null,
          }
        });
        this.toast.show({severity: 'success', summary: 'Operación Exitosa', detail: 'Juego Guardado'});
        this.juegosService.getAll().then(data => this.setState({
          juegos: data
        }));
      } 
    );
  }

  delete(){
    if(window.confirm("Desea eliminar el juego?")){
      this.juegosService.delete(this.state.selectedJuego.id).then(data => {
        this.toast.show({severity: 'success', summary: 'Operación Exitosa', detail: 'Juego Eliminado'});
        this.juegosService.getAll().then(data => this.setState({
          juegos: data
        }));
      })
    }
  }
  

  render (){
      return (
        <div style={{width: '80%', margin: ' 20px auto 0px'}}>
          <Menubar model = {this.items} style={{margin: '20px auto 10px'}}/>
          <Panel header = 'Proyecto Arquitectura'>
          <DataTable value={this.state.juegos} selectionMode="single" selection={this.state.selectedJuego} onSelectionChange={e => this.setState({selectedJuego: e.value})} sortField='id' sortOrder={1}>
            <Column field='id' header='Id'></Column>
            <Column field='nombre' header='Nombre Juego'></Column>
            <Column field='clasificacion' header='Clasificación'></Column>
            <Column field='genero' header='Genero'></Column>
            <Column field='fechaCreacion' header='Fecha de creación' dataType='date' date body={this.dateBodyTemplate}></Column>
            <Column field='desarrollador' header='Desarrollador'></Column>
            <Column field='modos' header='Modos de juego'></Column>
          </DataTable>
        </Panel>

        <Dialog header="Juego" visible={this.state.visible} style={{ width:'400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false}) }>
          <span className='p-float-label'>  
            <InputText value={this.state.juego.nombre} id = 'nombre' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let juego = Object.assign({}, prevState.juego);
                juego.nombre = val;
                return { juego }
              })}}/>
            <label htmlFor='nombre'>Nombre del Juego</label>
          </span>
          <br/>

          <span className='p-float-label'>  
            <InputText value={this.state.juego.clasificacion} id = 'clasificacion' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let juego = Object.assign({}, prevState.juego);
                juego.clasificacion = val;
                return { juego }
              })}}/>
            <label htmlFor='clasificacion'>Clasificación del Juego</label>
          </span>
          <br/>

          <span className='p-float-label'>  
            <InputText value={this.state.juego.genero} id = 'genero' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let juego = Object.assign({}, prevState.juego);
                juego.genero = val;
                return { juego }
              })}}/>
            <label htmlFor='genero'>Genero del Juego</label>
          </span>
          <br/>

          <span className='p-float-label'>  
            <Calendar value={this.state.juego.fechaCreacion} id = 'fechaCreacion' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let juego = Object.assign({}, prevState.juego);
                juego.fechaCreacion = val;
                return { juego }
              })}}/>
            <label htmlFor='fechaCreacion'>Fecha de creación del Juego</label>
          </span>
          <br/>

          <span className='p-float-label'>  
            <InputText value={this.state.juego.desarrollador} id = 'desarrollador' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let juego = Object.assign({}, prevState.juego);
                juego.desarrollador = val;
                return { juego }
              })}}/>
            <label htmlFor='desarrollador'>Estudio de desarrollo del Juego</label>
          </span>
          <br/>

          <span className='p-float-label'>  
            <InputText value={this.state.juego.modos} id = 'modos' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let juego = Object.assign({}, prevState.juego);
                juego.modos = val;
                return { juego }
              })}}/>
            <label htmlFor='modos'>Modos de Juego</label>
          </span>
          <br/>

        </Dialog>
        <Toast ref={toast => {this.toast = toast}} />
        </div>
      );
  }

  showSaveDialog(){
    this.setState({
      visible: true,
      juego: {
            id: null,
            nombre: null,
            clasificacion: null,
            genero: null,
            fechaCreacion: null,
            desarrollador: null,
            modos: null,
        },
    })
  }

  showEditDialog(){
    this.setState({
      visible: true,
      juego: {
        id: this.state.selectedJuego.id,
        nombre: this.state.selectedJuego.nombre,
        clasificacion: this.state.selectedJuego.clasificacion,
        genero: this.state.selectedJuego.genero,
        fechaCreacion: this.state.selectedJuego.fechaCreacion,
        desarrollador: this.state.selectedJuego.desarrollador,
        modos: this.state.selectedJuego.modos,
      },
    })
  }
}