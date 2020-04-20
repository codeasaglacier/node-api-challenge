const express = require( "express" )
const action = require( "../data/helpers/actionModel" )
const router = express.Router()

router.get( "/", ( req, res ) => {
  action.get()
    .then( ( action ) => {
      res.status( 200 ).json( action )
    })
    .catch( ( err ) => {
      console.log( err )
      res.status( 500 ).json( {
        message: "The action information could not be retrieved."
      } )
    })
} )

router.get( "/:id", ( req, res ) => {
	action.get( req.params.id )
		.then( ( action ) => {
			if ( action ) {
				res.status( 200 ).json( action )
			} else {
				res.status( 404 ).json( {
					message: "The action with the specified ID does not exist."
				} )
			}
		} )
		.catch( ( err ) => {
			console.log( err )
			res.status(500).json({
				message: "The action information could not be retrieved."
			})
		})
})

router.post( "/", ( req, res ) => {
  console.log( req.body )
	if ( !req.body ) {
		return res.status( 400 ).json( {
			message: "Please provide project id, description, and notes for the action."
		} )
	}

	action.insert( req.body )
		.then( ( action ) => {
			res.status( 201 ).json( action )
		} )
		.catch( ( err ) => {
			console.log( err )
			res.status( 500 ).json( {
				message: "There was an error while saving the action to the database"
			} )
		} )
} )

router.put( "/:id", ( req, res ) => {
	if ( !req.body ) {
		return res.status( 400 ).json( {
			message: "Please provide project id, description, and notes for the action."
		} )
	}
  
	action.update( req.params.id, req.body )
		.then( ( action ) => {
			if ( action ) {
				res.status( 200 ).json( action )
			} else {
				res.status( 404 ).json( {
					message: "The action with the specified ID does not exist."
				} )
			}
		} )
		.catch( ( err ) => {
			console.log( err )
			res.status( 500 ).json( {
				message: "The action information could not be modified."
			} )
		} )
} )

router.delete( "/:id", ( req, res ) => {
  action.remove( req.params.id )
		.then( ( count ) => {
			if ( count > 0 ) {
				res.status( 200 ).json( {
					message: "The action was delorted",
				} )
			} else {
				res.status( 404 ).json( {
					message: "The action with the specified ID does not exist."
				} )
			}
		} )
		.catch( ( err ) => {
			console.log( err )
			res.status( 500 ).json( {
				message: "The action could not be removed"
			} )
		} )
} )


module.exports = router