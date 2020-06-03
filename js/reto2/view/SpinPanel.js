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
import Panel from '../../../../sun/js/Panel.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HorizontalAquaRadioButtonGroup from '../../../../sun/js/HorizontalAquaRadioButtonGroup.js';
import Property from '../../../../axon/js/Property.js';
import AccessiblePeer from '../../../../scenery/js/accessibility/AccessiblePeer.js';

class SpinPanel extends Node {

    /**
    * @param RotationsKeypad {model}  // fronteras del layout
    * @param Bounds2 {layoutBounds}
    */
    constructor(model){

        super();

          //===================================================================================
          // Aqua Radio buttons
          //===================================================================================

          const firstOption = 'B';

          // Different pattern for interactive descriptions when there is the presence of a visual heading
          const horizontalAquaPropertyWithGroup = new Property( firstOption );

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

          this.addChild(
             new HBox({
                spacing: 5,
                align: 'top',
                children: [
                  new Panel( new VBox( {
                    children: [ radioButtonsHeading, horizontalAquaRadioButtonsWithGroup ],
                    align: 'left',
                    spacing: 5
                  } ) )
                  
                 ]
                //
              })
          );
    }
}

reto2.register( 'SpinPanel', SpinPanel );
export default SpinPanel;