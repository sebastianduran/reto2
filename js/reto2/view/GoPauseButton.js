// Copyright 2013-2020, University of Colorado Boulder

/**
 * A big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
 * which can be used to start/pause the animation.
 *
 * @author Sam Reid
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import BooleanToggleNode from '../../../../sun/js/BooleanToggleNode.js';
import RoundPushButton from '../../../../sun/js/buttons/RoundPushButton.js';
import reto2 from '../../reto2.js';

const goString = 'GO';
const pauseString = 'PAUSA';

//Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the bounds will match up
//If the node is already the largest, don't wrap it.
//Centers all the nodes in the parent wrappers
//TODO: Would be good to factor this out or provide better library support
/**
 * Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the
 * bounds will match up.  If the node is already the largest, don't wrap it.
 * Centers all the nodes in the parent wrappers.
 * @param  {Node} node
 * @param  {number} padX
 * @param  {number} padY
 * @param  {Array<Node>} nodes
 * @returns {Rectangle}
 */
function wrap( node, padX, padY, nodes ) {
  let maxWidth = -1;
  let maxHeight = -1;
  nodes.forEach( function( n ) {
    if ( n.width > maxWidth ) {
      maxWidth = n.width;
    }
    if ( n.height > maxHeight ) {
      maxHeight = n.height;
    }
  } );
  maxWidth += padX;
  maxHeight += padY;
  node.centerX = maxWidth / 2;
  node.centerY = maxHeight / 2;
  return new Rectangle( 0, 0, maxWidth, maxHeight, { children: [ node ] } );
}

/**
 * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
 *
 * @param {Reto1Model} model the NetForceModel
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function GoPauseButton( model, tandem, options, centerX, centerY ) {

  options = merge( {
    top: 400
  }, options );
  const padX = 1;
  const padY = 1;
  const goTextNode = new Text( goString, {
    font: new PhetFont( 22 ),
    tandem: tandem.createTandem( 'goTextNode' )
  } );
  const pauseTextNode = new Text( pauseString, {
    font: new PhetFont( 20 ),
    tandem: tandem.createTandem( 'pauseTextNode' )
  } );

  // boolean function to determine if the go button should be enabled based on model state.
  //const isGoButtonEnabled = function() {
  //  return model.stateProperty.get() !== 'completed' && ( model.numberPullersAttachedProperty.get() > 0 || model.runningProperty.get() );
  //};

  const goListener = function() {
    model.runningProperty.set( true );
  };

  const goButton = new RoundPushButton( {
    content: wrap( goTextNode, padX, padY, [ goTextNode, pauseTextNode ] ),
    baseColor: '#94b830',
    listener: goListener,
    tandem: tandem.createTandem( 'goButton' )
  } );//green

  const pauseListener = function() {
    model.runningProperty.set( false );
  };
  const pauseButton = new RoundPushButton( {
    content: wrap( pauseTextNode, padX, padY, [ goTextNode, pauseTextNode ] ),
    baseColor: '#df1a22',
    listener: pauseListener,
    tandem: tandem.createTandem( 'pauseButton' )
  } );//red

  const showGoButtonProperty = new DerivedProperty( [ model.runningProperty ], function( running ) { return !running; } );
  BooleanToggleNode.call( this, goButton, pauseButton, showGoButtonProperty, options );

  //Show the go/pause button if any pullers are attached or if the cart got started moving, and if it hasn't already finished a match, see #61
  /*Property.multilink( [ model.runningProperty, model.stateProperty, model.numberPullersAttachedProperty ], function() {
    const enabled = isGoButtonEnabled();
    goButton.enabled = enabled;
    pauseButton.enabled = enabled;
  } );*/

  this.centerX = centerX;
  this.centerY = centerY ;
}

reto2.register( 'GoPauseButton', GoPauseButton );

inherit( BooleanToggleNode, GoPauseButton );
export default GoPauseButton;