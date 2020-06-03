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

class RotationsKeypadNode extends Node {

    /**
    * @param Reto1 {model}
    * @param Vector2 {panelVector}
    * @param ScreenView {parent}
    */
    constructor(model, panelVector, parent){

        super();

          model.rotationsKeypad.decimalKeypad.valueStringProperty.link( function( valueString ) {
            model.rotationsKeypad.decimalText.text = valueString;
          });

          const keypad = new HBox( {
            spacing: 20,
            align: 'center',
            children: [
              // decimal keypad display
              new VBox( {
                spacing: 20,
                children: [ model.rotationsKeypad.decimalKeypad ]
              } )
            ],
            center: new Vector2(panelVector.x + 180, panelVector.y + 10 )
          } );
    
          model.rotationsKeypad.showKeypadProperty.link(function(visible){
            if (visible){
              parent.addChild(keypad);
            }else{
              parent.removeChild(keypad);
            }
          });
    }
}
reto2.register( 'RotationsKeypadNode', RotationsKeypadNode );
export default RotationsKeypadNode;