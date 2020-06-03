// Copyright 2013-2020, University of Colorado Boulder

/** View for the robot object, which can be dragged to translate.
 *
 * @author sebastian
 * 
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import reto2 from '../../reto2.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import NumberKeypad from '../../../../scenery-phet/js/NumberKeypad.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import HSlider from '../../../../sun/js/HSlider.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Panel from '../../../../sun/js/Panel.js';
import Color from '../../../../scenery/js/util/Color.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import FontAwesomeNode from '../../../../sun/js/FontAwesomeNode.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import HorizontalAquaRadioButtonGroup from '../../../../sun/js/HorizontalAquaRadioButtonGroup.js';
import Property from '../../../../axon/js/Property.js';
import AccessiblePeer from '../../../../scenery/js/accessibility/AccessiblePeer.js';
import Range from '../../../../dot/js/Range.js';

class ActionBlockNode extends Node {

  /**
  * @param Reto1 {model}
  * @param String {type}
  * @param int {blockid}
  */
  constructor( model, type, blockid ){

    super();

    const range = new Range(-100,100);
    const rotationsKeypadNode = false;
      
    /*
      ======Slider de Potencia el Slider ====
      */
    // Options for both NumberDisplay instances
    const numberDisplayOptions = {
      valuePattern: '% {{value}}',
      textOptions: {
        font: new PhetFont( 16 )
      },
      align: 'left'
    };

    //tratando de enviar el numero a Reto1Model
    const sliderListener = function() {
      model.powerProperty.set( numberproperty );
      model.powerArray[blockid-1] = numberproperty.value;
    };

    //Cambien la propiedad enabledProperty
    model.enableSliderProperty.link( enable =>{
      model.enableSliderProperty.set(enable);
    });

    // To demonstrate numeric value display
    const numberproperty = new NumberProperty( 0 );
    const numberDisplay = new NumberDisplay( numberproperty, range, numberDisplayOptions );

    const slider = new HSlider( numberproperty, range ,{
      trackSize: new Dimension2( 60, 5 ),
      thumbSize: new Dimension2( 16, 16 ),
      margin: 1,
      enabledProperty: model.enableSliderProperty,
      endDrag: sliderListener
    });

    //===================================================================================
    // Aqua Radio buttons
    //===================================================================================
    const firstOption = 'B';

    // Different pattern for interactive descriptions when there is the presence of a visual heading
    const horizontalAquaPropertyWithGroup = new Property( firstOption );
    horizontalAquaPropertyWithGroup.lazyLink( function( value ) {
      model.portArray[blockid-1] = value;
    } );
    const radioButtonsString = 'Motor a Girar';
    const radioButtonsHeading = new Text( radioButtonsString, {
      tagName: 'h3',
      innerContent: radioButtonsString
    } );
    const horizontalAquaRadioButtonsWithGroup = new HorizontalAquaRadioButtonGroup( horizontalAquaPropertyWithGroup, [
      {
        value: firstOption,
        node: new Text( firstOption ),
        labelContent: firstOption
      }, {
        value: 'C',
        node: new Text( 'C' ),
        labelContent: 'C'
      }
    ] );
    // The ul radio button group is aria-labelledby its the radio button heading
    horizontalAquaRadioButtonsWithGroup.addAriaLabelledbyAssociation( {
      thisElementName: AccessiblePeer.PRIMARY_SIBLING,
      otherElementName: AccessiblePeer.PRIMARY_SIBLING,
      otherNode: radioButtonsHeading
    } );

    const motorpanel =
        new HBox({
          spacing: 2,
          align: 'top',
          children: [
            new Panel( new VBox( {
              children: [ radioButtonsHeading, horizontalAquaRadioButtonsWithGroup ],
              align: 'left',
              spacing: 5 } ) )
            ]
        });

    /* ====================================
      ===== Editar Numero de Rotaciones ====
      ======================================*/
    const checkProperty = new Property (false);
    const decimalKeypad = new NumberKeypad( {
      decimalPointKey: true,
      validateKey: NumberKeypad.validateMaxDigits( { maxDigits: 4 } )
    } );
  
    // value of decimalKeypad is displayed here
    const decimalText = new Text( '0', { font: new PhetFont( 20 ) } );
    decimalKeypad.valueStringProperty.link( function( valueString ) {
      decimalText.text = valueString;
      model.rotationProperty.value = valueString;
      model.blockidProperty.value = blockid;
      model.rotaArray[blockid-1] = parseFloat(valueString);
    } );

    const checkbutton = new RectangularPushButton( {
      content: new FontAwesomeNode( 'check', {
        scale: 0.6,
        xMargin: 2,
        yMargin: 2
      } ),
      center: new Vector2(18,28),
      baseColor: new Color(20, 200 , 20),
      listener: function() {
        checkProperty.set(false);
      }
    } );
    
    const keypad = new VBox( {
      spacing: 1,
      align: 'center',
      top: 100,
      left: -40,
      children: [decimalKeypad, checkbutton]
    } );
    
    //Boton para editar rotacion (muestra el keypad)
    const editRotations = new RectangularPushButton( {
      content: new FontAwesomeNode( 'pencil_square_o', {
        scale: 0.2,
        xMargin: 2,
        yMargin: 2
      } ),
      center: new Vector2(18,28),
      baseColor: new Color(200, 200 ,0),
      listener: function() {
        if ( rotationsKeypadNode ) {
          model.showKeypad.visible.value = true;
          checkProperty.set(false);
        }else{
          model.showKeypad.visible.value = false;
          checkProperty.set(true);
        }
      }
    } );
    
    checkProperty.link(function (check){
      keypad.visible = check ;
    });
    this.addChild(keypad);
    

    // Grupo de edicion del numero de rotacions
    const editgroup = new HBox({
          spacing: 3,
          align: 'top',
          children: [
            new VBox({
              spacing: 2 ,
              align: 'center',
              children: [
                new Text ( '#', { font: new PhetFont( 16 ) } ),
                editRotations]}),
            new Panel (decimalText, {minWidth: 50})
          ]
        });

    
    //========
    if (type === 'traslate'){

      this.addChild( new Panel ( new VBox ( {
        spacing: 5,
        children: [editgroup, new VBox ({
                                  spacing: 5,
                                  children: [ numberDisplay, slider ] } )
                                ]}
              )));

    }else if (type === 'rotate'){

      this.addChild( new Panel ( new VBox ( {
        spacing: 5,
        children: [editgroup,  motorpanel ]}
              )));
    }
    
  }
}
reto2.register( 'ActionBlockNode', ActionBlockNode );
export default ActionBlockNode;