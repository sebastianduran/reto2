// Copyright 2013-2020, University of Colorado Boulder

/** View for the robot object, which can be dragged to translate.
 *
 * @author sebastian duran
 * 
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import reto2 from '../../reto2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Property from '../../../../axon/js/Property.js';
import MeasuringTapeNode from '../../../../scenery-phet/js/MeasuringTapeNode.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';

class FlexometroNode extends Node {

  /**
   * @param Bounds2 {layoutBounds}  // fronteras del layout
   */
  constructor(baseX, baseY){

    super();

    const measuringTapeUnitsProperty = new Property( { name: 'mm', multiplier: 1.35 } );

    this.addChild(new MeasuringTapeNode( measuringTapeUnitsProperty, new Property( true ), {
        textColor: 'black',
        textBackgroundColor: 'rgba( 255, 0, 0, 0.1 )', // translucent red
        textBackgroundXMargin: 10,
        textBackgroundYMargin: 3,
        textBackgroundCornerRadius: 5,
        basePositionProperty: new Vector2Property( new Vector2( baseX, baseY) ),
        tipPositionProperty: new Vector2Property( new Vector2( baseX, baseY -50) )
      } ) );
  }
}

reto2.register( 'FlexometroNode', FlexometroNode );
export default FlexometroNode;