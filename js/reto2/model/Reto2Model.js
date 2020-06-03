// Copyright 2020, University of Colorado Boulder

/**
 * @author Sebastian Duran
 */

import reto2 from '../../reto2.js';
import Robot from './Robot.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Range from '../../../../dot/js/Range.js';
import AlertDialogModel from './AlertDialogModel.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import ShowKeypad from './ShowKeypad.js';
import ObservableArray from '../../../../axon/js/ObservableArray.js';

//constants
//const GAME_LENGTH = 508;
const initPosY = 262; //262
const initPosX = -262; //-262
const constRotacion = 106 ; // tamaño en pixeles del diametro de la rueda

/**
 * @constructor
 */
class Reto2Model {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    //TODO
    const self = this;

    this.robot = new Robot(new Dimension2(101, 100), new Vector2  (initPosX,initPosY), 0);

    /* == Propiedades del boton gopausebutto ===*/
    this.startedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'startedProperty' )
    } );

    this.runningProperty = new BooleanProperty(false, {
    });

    this.runningProperty.link(function(running){
      if (running) {
         self.startedProperty.set( true );
      }
    } );

    this.timeProperty = new Property( 0, {
      // TODO: Removed this property for phet-io spam
      // tandem: tandem.createTandem( 'timeProperty' )
      // phetioType: PropertyIO(NumberIO)( 'seconds' )
    } );

    this.speedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'speedProperty' ),
      units: 'meters/second',
      range: new Range( 0, 6 )
    } );

    // Propiedades del Keypad
    this.showKeypad = new ShowKeypad(false);

    // keypad
    this.rotationProperty = new Property( 0 );
    this.blockidProperty = new Property( 0 );

    this.portArray = new ObservableArray();
    this.portArray = [0,'B',0,'B',0,'B',0,'B',0];
    this.rotaArray = new ObservableArray();
    this.rotaArray = [0, 0, 0, 0, 0, 0, 0,  0, 0];
    this.powerArray = new ObservableArray();
    this.powerArray = [0,50, 0,50, 0,50, 0,50, 0];
    
    this.block1Flag = new BooleanProperty( false );
    this.block2Flag = new BooleanProperty( false );
    this.block3Flag = new BooleanProperty( false );
    this.block4Flag = new BooleanProperty( false );
    this.block5Flag = new BooleanProperty( false );
    this.block6Flag = new BooleanProperty( false );
    this.block7Flag = new BooleanProperty( false );
    this.block8Flag = new BooleanProperty( false );
    this.block9Flag = new BooleanProperty( false );

    this.initposXArray = new ObservableArray();
    this.initposXArray = [initPosX,0, 0,0, 0,0, 0,0, 0];
    this.initposYArray = new ObservableArray();
    this.initposYArray = [initPosY,0, 0,0, 0,0, 0,0, 0];
    this.initOrientation = new ObservableArray();
    this.initOrientation = [0,0,0,0,0,0,0,0,0];

    // Slider de potencia
    //this.powerSlider = new PowerSlider(0,true);
    this.powerProperty = new NumberProperty (0);
    this.enableSliderProperty = new Property (true);

    //dialogo alert
    this.dialogTooLongProperty = new BooleanProperty(false);
    this.alertDialogModel = new AlertDialogModel('mensaje inicial');

  }

  /**
   * Resets the model.
   * @public
   */
  reset() {
    //TODO
    this.robot.reset();
    this.runningProperty.set( false );
    this.block1Flag.set( false );
    this.block2Flag.set( false );
    this.block3Flag.set( false );
    this.block4Flag.set( false );
    this.block5Flag.set( false );
    this.block6Flag.set( false );
    this.block7Flag.set( false );
    this.block8Flag.set( false );
    this.block9Flag.set( false );

    this.initposXArray = [initPosX,0, 0,0, 0,0, 0,0, 0];
    this.initposYArray = [initPosY,0, 0,0, 0,0, 0,0, 0];
    this.initOrientation = [0,0,0,0,0,0,0,0,0];

    // Slider de potencia
    //this.powerSlider = new PowerSlider(0,true);
    this.powerProperty.set(0);
    this.enableSliderProperty.set(true);
  }

  /**
   * Steps the model.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {
    //TODO
    
    if (this.runningProperty.get()){
      
      if (!this.block1Flag.get()){
        if (rotationMove(this, 1 , Math.cos(0), Math.sin(0) )){
          // Guardo posicion como posion inicial para el proximo tramo
          this.initposXArray[1] = this.robot.positionProperty.value.x;
          this.initposYArray[1] = this.robot.positionProperty.value.y;
          //cambio el proximo tramo
          this.block1Flag.set(true);
        }
      }
      if (this.block1Flag.get() && !this.block2Flag.get()){
        if (spinMove(this, 2, this.portArray[1])){
          this.initposXArray[2] = this.robot.positionProperty.value.x;
          this.initposYArray[2] = this.robot.positionProperty.value.y;
          this.initOrientation[3]  = this.robot.orientationProperty.value;
          this.block2Flag.set(true);
        }
      }
      if (this.block2Flag.get() && !this.block3Flag.get()){
        const orientation = this.robot.orientationProperty.value;
        if (rotationMove(this, 3, Math.cos(orientation), Math.sin(orientation))){
          this.initposXArray[3] = this.robot.positionProperty.value.x;
          this.initposYArray[3] = this.robot.positionProperty.value.y;
          this.block3Flag.set(true);
        }
      }
      if (this.block3Flag.get() && !this.block4Flag.get()){
        if (spinMove(this, 4, this.portArray[3])){
          this.initposXArray[4] = this.robot.positionProperty.value.x;
          this.initposYArray[4] = this.robot.positionProperty.value.y;
          this.initOrientation[5]  = this.robot.orientationProperty.value;
          this.block4Flag.set(true);
        }
      }
      if (this.block4Flag.get() && !this.block5Flag.get()){
        const orientation = this.robot.orientationProperty.value;
        if (rotationMove(this, 5, Math.cos(orientation), Math.sin(orientation))){
          this.initposXArray[5] = this.robot.positionProperty.value.x;
          this.initposYArray[5] = this.robot.positionProperty.value.y;
          this.block5Flag.set(true);
        }
      }
      if (this.block5Flag.get() && !this.block6Flag.get()){
        if (spinMove(this, 6, this.portArray[5])){
          this.initposXArray[6] = this.robot.positionProperty.value.x;
          this.initposYArray[6] = this.robot.positionProperty.value.y;
          this.initOrientation[7]  = this.robot.orientationProperty.value;
          this.block6Flag.set(true);
        }
      }
      if (this.block6Flag.get() && !this.block7Flag.get()){
        const orientation = this.robot.orientationProperty.value;
        if (rotationMove(this, 7, Math.cos(orientation), Math.sin(orientation))){
          this.initposXArray[7] = this.robot.positionProperty.value.x;
          this.initposYArray[7] = this.robot.positionProperty.value.y;
          this.block7Flag.set(true);
        }
      }
      if (this.block7Flag.get() && !this.block8Flag.get()){
        if (spinMove(this, 8, this.portArray[7])){
          this.initposXArray[8] = this.robot.positionProperty.value.x;
          this.initposYArray[8] = this.robot.positionProperty.value.y;
          this.initOrientation[9]  = this.robot.orientationProperty.value;
          this.block8Flag.set(true);
        }
      }
      if (this.block8Flag.get() && !this.block9Flag.get()){
        const orientation = this.robot.orientationProperty.value;
        if (rotationMove(this, 9, Math.cos(orientation), Math.sin(orientation))){
          this.initposXArray[9] = this.robot.positionProperty.value.x;
          this.initposYArray[9] = this.robot.positionProperty.value.y;
          this.block9Flag.set(true);
          this.runningProperty.set(false);
        }
      }

    }
    else{
      this.enableSliderProperty.set(true);
      this.alertDialogModel.dialogTextProperty.set('');
    }
    this.timeProperty.set( this.timeProperty.get() + dt );
  }
  
}


reto2.register( 'Reto2Model', Reto2Model );

// Función para cada movimiento que hace el robot, dando aviso para pasar al siguiente cuando haya terminado
// model (this)  block: numero de blocke, mov movimiento en un eje, puerto simula el motor que se gira
const rotationMove = function(model, block, movX, movY ){

  //posición actual del robot en X
  const posX = model.robot.positionProperty.value.x;
  const posY = model.robot.positionProperty.value.y;

  model.enableSliderProperty.set(false);
  
  // Slider de potencia
  let power = model.powerArray[block-1];
  if (power === undefined){
    power = 0;
  }
  
  //Movimiento del robot //
  model.robot.positionProperty.value = new Vector2( posX + 1 * (power /20)*movX, posY + 1 * (power /20)*movY);
  // calculo de la posición final calculada con una costante de rotación
  
  const finalposX = model.initposXArray[ block-1 ] + (parseFloat(model.rotaArray[ block - 1 ])*constRotacion*movX);
  const finalposY = model.initposYArray[ block-1 ] + (parseFloat(model.rotaArray[ block - 1 ])*constRotacion*movY);

  //console.log("x "+ posX + "  init " + model.initposXArray[ block-1 ] + "  final x " + finalposX);
  //console.log("y "+ posY + "  init " + model.initposYArray[ block-1 ] + "  final y " + finalposY);
  
  if (posX < -2500 || posX > 2500 || posY < -2500 || posY > 2500){
    model.alertDialogModel.dialogTextProperty.set('desbordado');
    model.runningProperty.set( false );
  }

  //console.log(Math.sqrt((finalposX - posX)** 2 + (finalposY - posY )**2));
  if ( Math.sqrt((finalposX - posX)** 2 + (finalposY - posY )**2) <= 5 ) {
    return true;
  }
    
  return false;
};

const spinMove = function (model, block, port){
 
  // sentido del giro segun el puerto del motor que se escoja
  const sentido = (port === 'B' ? 1 : -1);
  
  //posición actual del robot en X 
  // solo se utilizan estas dos const si se va a hacer el giro sobre el pivote
  const posX = model.robot.positionProperty.value.x;
  const posY = model.robot.positionProperty.value.y;

  const pasoG = 180; // numero de pasos entre cada cambio de posicion
  //orientación actual, angulo
  const orientation = model.robot.orientationProperty.get() ;
  const absOrientation = Math.abs(orientation);

  if (port === 'B'){
    // Aqui block representa los grados de movimiento del robot
    const angle =  Math.abs(model.initOrientation[ (block-1)]) + (model.rotaArray[block-1] % 360) * Math.PI / 180;
    if (absOrientation < angle  ){
      model.robot.orientationProperty.set( orientation - ( sentido * Math.PI /pasoG ));
  
      ///  Giro en pivote ======= Todavia hay que calcular el giro sobre una rueda por eso no se utiliza este codigo
      /// Solo esta apoximado los valores
      if ( absOrientation > 0 && absOrientation < Math.PI / 2  ){
        model.robot.positionProperty.value = new Vector2( posX + 0 * Math.cos(orientation) / pasoG, posY + posY * Math.sin(orientation) / pasoG);
      }
      else if (absOrientation >=  Math.PI / 2 && absOrientation <  Math.PI ){
        model.robot.positionProperty.value = new Vector2( posX - 0 * posX * Math.cos(orientation) / pasoG, posY + posY * Math.sin(orientation) / pasoG);
      }
      else if (absOrientation >=  Math.PI  && absOrientation < 3 * Math.PI / 2 ){
        model.robot.positionProperty.value = new Vector2( posX - 0 * Math.cos(orientation) / pasoG, posY + posY * Math.sin(orientation) / pasoG);
      }
      else if (absOrientation >=  3 * Math.PI / 2  && absOrientation < 2 * Math.PI ){
        model.robot.positionProperty.value = new Vector2( posX - posX * Math.cos(orientation) / pasoG, posY + 0 * Math.sin(orientation) / pasoG);
      }
    }else {
      return true;
    }
  }
  if (port === 'C'){
    // Aqui block representa los grados de movimiento del robot
    const angle =  model.initOrientation[ (block-1)] + (model.rotaArray[block-1] % 360) * Math.PI / 180;

    if (orientation < angle  ){

      model.robot.orientationProperty.set( orientation + Math.PI /pasoG );
  
      ///  Giro en pivote ======= Todavia hay que calcular el giro sobre una rueda por eso no se utiliza este codigo
      /// Solo esta apoximado los valores
      if ( orientation > 0 && orientation < Math.PI / 2  ){
        model.robot.positionProperty.value = new Vector2( posX + 0 * Math.cos(orientation) / pasoG, posY + posY * Math.sin(orientation) / pasoG);
      }
      else if (orientation >=  Math.PI / 2 && orientation <  Math.PI ){
        model.robot.positionProperty.value = new Vector2( posX -  posX * Math.cos(orientation) / pasoG, posY - 0 * Math.sin(orientation) / pasoG);
      }
      else if (orientation >=  Math.PI  && orientation < 3 * Math.PI / 2 ){
        model.robot.positionProperty.value = new Vector2( posX - 0 * Math.cos(orientation) / pasoG, posY + posY * Math.sin(orientation) / pasoG);
      }
      else if (orientation >=  3 * Math.PI / 2  && orientation < 2 * Math.PI ){
        model.robot.positionProperty.value = new Vector2( posX - posX * Math.cos(orientation) / pasoG, posY + 0 * Math.sin(orientation) / pasoG);
      }
    }else {
      return true;
    }
  }
      //const orientation = model.robot.orientationProperty.get() - Math.PI/180;
      //model.robot.orientationProperty.set( orientation );    
};
export default Reto2Model;