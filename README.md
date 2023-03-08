# flows-automation

1. [Cerrar devos](https://github.com/eespejo1/flows-automation/tree/main/Cerrar_devos): Sigue un flujo en el que mediante el `claimId` busca informacion de la orden, returns asociadas, bpp, y return state.


  | Endpoint | Field | Respuesta Requerida     |
  | :-------- | :------- | :------- | 
  | v1/claims/`claim_ID`/state?client.id=###&caller.scopes=admin | `name` | `return_allowed` o `return_pending` | 
  | /post-purchase/returns/search?claim_id=`claimId`| `data` | Debe ser una lista vacía | 
  | /purchase_protection/evaluate?entity_type=order&entity_id=`orderId`| `protected_until_date` | Deben faltar más de 5 días |

  Si se cumplen todas estas validaciones se procede a cerrar el claim.

## Como usar:
En la raíz del repositorio correr el comando en la terminal `npm install`, una vez termine de instalar todas las dependencias, dentro de la carpeta `Cerrar_devos` en el archivo `main.js`, modificar el `claimId` por el que se desea cerrar, y enseguida correr en la terminal `node Cerrar_devo main.js`. En la terminal se visualizarán los datos del claim y si este fue cerrado o no, en caso de que no, mostrará la razón por la cual no pudo ser cerrado (bpp is not enough, claim has already a return, claim State different to return_allowed or return_pending). 

Cada vez que se corra el flujo, al finalizar se irá añadiendo al archivo `data.csv`, el cual contendrá los datos de ClaimId, la fecha en la que expira la bpp, la finalizacion (`Done`en el caso en que haya sido cerrado), y en caso de que no haya sido cerrado un nuevo campo con la razon por la cual no pudo hacerlo.
