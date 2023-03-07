# flows-automation

1. [Cerrar devos](https://github.com/eespejo1/flows-automation/tree/main/Cerrar_devos): Sigue un flujo en el que mediante el `claimId` busca informacion de la orden, returns asociadas, bpp, y return state.


  | Endpoint | Field | Respuesta Requerida     |
  | :-------- | :------- | :------- | 
  | v1/claims/`claim_ID`/state?client.id=###&caller.scopes=admin | `name` | `return_allowed` o `return_pending` | 
  | /post-purchase/returns/search?claim_id=`claimId`| `data` | Debe ser una lista vacía | 
  | /purchase_protection/evaluate?entity_type=order&entity_id=`orderId`| `protected_until_date` | Deben faltar más de 5 días |

  Si se cumplen todas estas validaciones se procede a cerrar el claim.
