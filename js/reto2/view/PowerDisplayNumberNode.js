// Copyright 2013-2020, University of Colorado Boulder

/** View for the robot object, which can be dragged to translate.
 *
 * @author sebastian duran
 * 
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import reto2 from '../../reto2.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';

class PowerDisplayNumberNode extends Node {

	/**
   	* @param Bounds {panelBounds}  // fronteras del layout
   	*/

	constructor(model, range){

		super();

	// Options for both NumberDisplay instances
	const numberDisplayOptions = {
		valuePattern: '% pot    {{value}}',
		textOptions: {
			font: new PhetFont( 16 )
		},
		align: 'left'
	};

	//tratando de enviar el numero a Reto1Model
	const sliderListener = function() {
		model.powerProperty.set( numberproperty );
	};

	//Cambien la propiedad enabledProperty
	model.enableSliderProperty.link( enable =>{
		model.enableSliderProperty.set(enable);
	});

	// To demonstrate numeric value display
	const numberproperty = new NumberProperty( 0 );
	const numberDisplay = new NumberDisplay( numberproperty, range, numberDisplayOptions );

	const slider = new HSlider( numberproperty, range ,{
		thumbSize: new Dimension2( 16, 16 ),
		enabledProperty: model.enableSliderProperty,
		endDrag: sliderListener
	});

	this.addChild( new VBox( {
		spacing: 5,
		children: [ numberDisplay, slider ]
	} ) );
	}
}

reto2.register( 'PowerDisplayNumberNode', PowerDisplayNumberNode );
export default PowerDisplayNumberNode;