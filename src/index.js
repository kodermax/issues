import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.compact.css'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import $ from 'jquery'
import 'devextreme/integration/jquery'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable max-len */
// karpychev
  window.localStorage.setItem('issuesToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXF1ZXN0cyIsImlhdCI6MTQ5MjUwNTg4NiwiZXhwIjoxNDkyNjAyNjU0LCJhdWQiOiJwb3J0YWwuYmlubm9waGFybS5ydSIsInN1YiI6IkthcnB5Y2hldkBiaW5ub3BoYXJtLnJ1IiwiR2l2ZW5OYW1lIjoiXHUwNDFjXHUwNDMwXHUwNDNhXHUwNDQxXHUwNDM4XHUwNDNjIiwiU3VybmFtZSI6bnVsbCwiRW1haWwiOiJLYXJweWNoZXZAYmlubm9waGFybS5ydSIsIklkIjoiNDEzYjI5ZWItYTJmMy0xMWU1LThiYzEtMDA1MDU2OGMwMDA3IiwiUG9zaXRpb24iOiJcdTA0MTBcdTA0MzRcdTA0M2NcdTA0MzhcdTA0M2RcdTA0MzhcdTA0NDFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0NDJcdTA0M2VcdTA0NDAtXHUwNDQwXHUwNDMwXHUwNDM3XHUwNDQwXHUwNDMwXHUwNDMxXHUwNDNlXHUwNDQyXHUwNDQ3XHUwNDM4XHUwNDNhIFx1MDQxMVx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQzOFx1MDQzYVx1MDQ0MSIsIkxvZ2luIjoiS2FycHljaGV2IiwiUHVyY2hhc2UiOnsiQWRtaW4iOnRydWUsIldvcmtlciI6dHJ1ZSwiU2VjdXJpdHkiOmZhbHNlfSwiUmVjcnVpdG1lbnQiOnsiQWRtaW4iOnRydWUsIldvcmtlciI6ZmFsc2UsIlNlY3VyaXR5IjpmYWxzZX19.rwuWELInTCM1k0V7IjhxIg0AQCrCDQRhNqvu8AguPi0')
// sokolov
// window.localStorage.setItem('issuesToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXF1ZXN0cyIsImlhdCI6MTQ5ODQ2NzA3MiwiZXhwIjoxNDk4NTYzODQwLCJhdWQiOiJwb3J0YWwuYmlubm9waGFybS5ydSIsInN1YiI6InNva29sb3ZAYmlubm9waGFybS5ydSIsIkdpdmVuTmFtZSI6Ilx1MDQxZlx1MDQzMFx1MDQzMlx1MDQzNVx1MDQzYiIsIlN1cm5hbWUiOm51bGwsIkVtYWlsIjoic29rb2xvdkBiaW5ub3BoYXJtLnJ1IiwiSWQiOiJjMjJlMDMzNi1iZGU0LTExZTUtOGJjMS0wMDUwNTY4YzAwMDciLCJQb3NpdGlvbiI6Ilx1MDQxNFx1MDQzOFx1MDQ0MFx1MDQzNVx1MDQzYVx1MDQ0Mlx1MDQzZVx1MDQ0MCBcdTA0MzRcdTA0MzVcdTA0M2ZcdTA0MzBcdTA0NDBcdTA0NDJcdTA0MzBcdTA0M2NcdTA0MzVcdTA0M2RcdTA0NDJcdTA0MzAgXHUwNDNmXHUwNDNlIFx1MDQzOFx1MDQzZFx1MDQ0NFx1MDQzZVx1MDQ0MFx1MDQzY1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzZVx1MDQzZFx1MDQzZFx1MDQ0Ylx1MDQzYyBcdTA0NDJcdTA0MzVcdTA0NDVcdTA0M2RcdTA0M2VcdTA0M2JcdTA0M2VcdTA0MzNcdTA0MzhcdTA0NGZcdTA0M2MiLCJMb2dpbiI6InNva29sb3YiLCJQdXJjaGFzZSI6eyJBZG1pbiI6ZmFsc2UsIldvcmtlciI6ZmFsc2UsIlNlY3VyaXR5IjpmYWxzZX0sIlJlY3J1aXRtZW50Ijp7IkFkbWluIjpmYWxzZSwiV29ya2VyIjpmYWxzZSwiU2VjdXJpdHkiOmZhbHNlfX0.Y2Ommq9V13O87dUX5wclYWG05JJIOyI4MU_VnfGBndI')
// emelyanova
  //window.localStorage.setItem('issuesToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXF1ZXN0cyIsImlhdCI6MTQ5ODQ2OTc4MCwiZXhwIjoxNDk4NTY2NTQ4LCJhdWQiOiJwb3J0YWwuYmlubm9waGFybS5ydSIsInN1YiI6ImVtZWx5YW5vdmFAYmlubm9waGFybS5ydSIsIkdpdmVuTmFtZSI6Ilx1MDQxY1x1MDQzMFx1MDQ0MFx1MDQzOFx1MDQzZFx1MDQzMCIsIlN1cm5hbWUiOm51bGwsIkVtYWlsIjoiZW1lbHlhbm92YUBiaW5ub3BoYXJtLnJ1IiwiSWQiOiIzMjZkODNhNy0xMjlhLTExZTYtYTJjYy0wMDUwNTY4YzAwMDciLCJQb3NpdGlvbiI6Ilx1MDQyMVx1MDQzZlx1MDQzNVx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzYlx1MDQzOFx1MDQ0MVx1MDQ0MiBcdTA0M2ZcdTA0M2UgXHUwNDNkXHUwNDMwXHUwNDMxXHUwNDNlXHUwNDQwXHUwNDQzLCBcdTA0MzBcdTA0MzRcdTA0MzBcdTA0M2ZcdTA0NDJcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzggXHUwNDM4IFx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQzOFx1MDQ0ZSBcdTA0M2ZcdTA0MzVcdTA0NDBcdTA0NDFcdTA0M2VcdTA0M2RcdTA0MzBcdTA0M2JcdTA0MzAiLCJMb2dpbiI6ImVtZWx5YW5vdmEiLCJQdXJjaGFzZSI6eyJBZG1pbiI6ZmFsc2UsIldvcmtlciI6ZmFsc2UsIlNlY3VyaXR5IjpmYWxzZX0sIlJlY3J1aXRtZW50Ijp7IkFkbWluIjp0cnVlLCJXb3JrZXIiOmZhbHNlLCJTZWN1cml0eSI6ZmFsc2V9fQ.trGFJhMarBgMqSeNjeWcRictVTYiJ3CGfWttQAByOXk')
// kolosov
 // window.localStorage.setItem('issuesToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXF1ZXN0cyIsImlhdCI6MTQ5ODQ3MDA3OCwiZXhwIjoxNDk4NTY2ODQ2LCJhdWQiOiJwb3J0YWwuYmlubm9waGFybS5ydSIsInN1YiI6ImtvbG9zb3ZAYmlubm9waGFybS5ydSIsIkdpdmVuTmFtZSI6Ilx1MDQxOFx1MDQzM1x1MDQzZVx1MDQ0MFx1MDQ0YyIsIlN1cm5hbWUiOm51bGwsIkVtYWlsIjoia29sb3NvdkBiaW5ub3BoYXJtLnJ1IiwiSWQiOiIwNTlkOTBmNy00OWJkLTExZTctYTgxYi0wMDUwNTY4YzAwMDciLCJQb3NpdGlvbiI6Ilx1MDQxY1x1MDQzNVx1MDQzZFx1MDQzNVx1MDQzNFx1MDQzNlx1MDQzNVx1MDQ0MCBcdTA0M2ZcdTA0M2UgXHUwNDNlXHUwNDMxXHUwNDM1XHUwNDQxXHUwNDNmXHUwNDM1XHUwNDQ3XHUwNDM1XHUwNDNkXHUwNDM4XHUwNDRlIFx1MDQzMVx1MDQzNVx1MDQzN1x1MDQzZVx1MDQzZlx1MDQzMFx1MDQ0MVx1MDQzZFx1MDQzZVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0M2ZcdTA0MzVcdTA0NDBcdTA0NDFcdTA0M2VcdTA0M2RcdTA0MzBcdTA0M2JcdTA0MzAgXHUwNDM4IFx1MDQzZVx1MDQzMVx1MDQ0YVx1MDQzNVx1MDQzYVx1MDQ0Mlx1MDQzZVx1MDQzMiIsIkxvZ2luIjoia29sb3NvdiIsIlB1cmNoYXNlIjp7IkFkbWluIjpmYWxzZSwiV29ya2VyIjpmYWxzZSwiU2VjdXJpdHkiOmZhbHNlfSwiUmVjcnVpdG1lbnQiOnsiQWRtaW4iOmZhbHNlLCJXb3JrZXIiOmZhbHNlLCJTZWN1cml0eSI6ZmFsc2V9fQ.TlNxLjqupmO5wDM92VfWyWNPzPVCSCt3cbxBW75wRFk')
 // perehrest
//  window.localStorage.setItem('issuesToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXF1ZXN0cyIsImlhdCI6MTUwMTY3NTE1OCwiZXhwIjoxNTAxNzcxOTI2LCJhdWQiOiJwb3J0YWwuYmlubm9waGFybS5ydSIsInN1YiI6InBlcmVraHJlc3RAYmlubm9waGFybS5ydSIsIkdpdmVuTmFtZSI6Ilx1MDQxZFx1MDQzMFx1MDQzNFx1MDQzNVx1MDQzNlx1MDQzNFx1MDQzMCIsIlN1cm5hbWUiOm51bGwsIkVtYWlsIjoicGVyZWtocmVzdEBiaW5ub3BoYXJtLnJ1IiwiSWQiOiIwYzk0ZmI5ZC01NGZhLTExZTctYmQyMi0wMDUwNTY4YzAwMDciLCJQb3NpdGlvbiI6Ilx1MDQyMFx1MDQ0M1x1MDQzYVx1MDQzZVx1MDQzMlx1MDQzZVx1MDQzNFx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzYlx1MDQ0YyBcdTA0M2VcdTA0NDJcdTA0MzRcdTA0MzVcdTA0M2JcdTA0MzAgXHUwNDNmXHUwNDNlIFx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQzOFx1MDQ0ZSwgXHUwNDNmXHUwNDNlXHUwNDM0XHUwNDMxXHUwNDNlXHUwNDQwXHUwNDQzIFx1MDQzOCBcdTA0MzBcdTA0MzRcdTA0MzBcdTA0M2ZcdTA0NDJcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzggXHUwNDNmXHUwNDM1XHUwNDQwXHUwNDQxXHUwNDNlXHUwNDNkXHUwNDMwXHUwNDNiXHUwNDMwLCBcdTA0NDBcdTA0MzVcdTA0MzBcdTA0M2JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzggXHUwNDNmXHUwNDQwXHUwNDNlXHUwNDM1XHUwNDNhXHUwNDQyXHUwNDNlXHUwNDMyIFx1MDQzZlx1MDQzZSBcdTA0NDNcdTA0M2ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M2JcdTA0MzVcdTA0M2RcdTA0MzhcdTA0NGUgXHUwNDNmXHUwNDM1XHUwNDQwXHUwNDQxXHUwNDNlXHUwNDNkXHUwNDMwXHUwNDNiXHUwNDNlXHUwNDNjIiwiTG9naW4iOiJwZXJla2hyZXN0IiwiUHVyY2hhc2UiOnsiQWRtaW4iOmZhbHNlLCJXb3JrZXIiOmZhbHNlLCJTZWN1cml0eSI6ZmFsc2V9LCJSZWNydWl0bWVudCI6eyJBZG1pbiI6dHJ1ZSwiV29ya2VyIjpmYWxzZSwiU2VjdXJpdHkiOmZhbHNlfX0.cgDZRA-v2GCfdFhE5KFjicMUDL7vdMyJ5SO0a8Mp0Qw')
 // zasoba
 //window.localStorage.setItem('issuesToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXF1ZXN0cyIsImlhdCI6MTUwMjcwMTM4NSwiZXhwIjoxNTAyNzk4MTUzLCJhdWQiOiJwb3J0YWwuYmlubm9waGFybS5ydSIsInN1YiI6Inphc29iYUBiaW5ub3BoYXJtLnJ1IiwiR2l2ZW5OYW1lIjoiXHUwNDE1XHUwNDNhXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDNkXHUwNDMwIiwiU3VybmFtZSI6Ilx1MDQxN1x1MDQzMFx1MDQ0MVx1MDQzZVx1MDQzMVx1MDQzMCIsIkVtYWlsIjoiemFzb2JhQGJpbm5vcGhhcm0ucnUiLCJJZCI6IjU4ZWRjMzFmLTJlMzItMTFlNi05ZDQxLTAwNTA1NjhjMDAwNyIsIlBvc2l0aW9uIjoiXHUwNDE0XHUwNDM4XHUwNDQwXHUwNDM1XHUwNDNhXHUwNDQyXHUwNDNlXHUwNDQwIFx1MDQzZlx1MDQzZSBcdTA0M2ZcdTA0MzVcdTA0NDBcdTA0NDFcdTA0M2VcdTA0M2RcdTA0MzBcdTA0M2JcdTA0NDMtXHUwNDI3XHUwNDNiXHUwNDM1XHUwNDNkIFx1MDQzZlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQzYlx1MDQzNVx1MDQzZFx1MDQzOFx1MDQ0ZiIsIkxvZ2luIjoiemFzb2JhIiwiUHVyY2hhc2UiOnsiQWRtaW4iOmZhbHNlLCJXb3JrZXIiOmZhbHNlLCJTZWN1cml0eSI6ZmFsc2V9LCJSZWNydWl0bWVudCI6eyJBZG1pbiI6ZmFsc2UsIldvcmtlciI6ZmFsc2UsIlNlY3VyaXR5IjpmYWxzZX19.i1wBs-ysguLWBviwUhbR7yAspMm3fseUpLKxO4Og2y8')
 // patykov
//window.localStorage.setItem('issuesToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXF1ZXN0cyIsImlhdCI6MTUwMjcwMTg1NCwiZXhwIjoxNTAyNzk4NjIyLCJhdWQiOiJwb3J0YWwuYmlubm9waGFybS5ydSIsInN1YiI6InBhdHl1a292QGJpbm5vcGhhcm0ucnUiLCJHaXZlbk5hbWUiOiJcdTA0MTBcdTA0M2JcdTA0MzVcdTA0M2FcdTA0NDFcdTA0MzBcdTA0M2RcdTA0MzRcdTA0NDAiLCJTdXJuYW1lIjoiXHUwNDFmXHUwNDMwXHUwNDQyXHUwNDRlXHUwNDNhXHUwNDNlXHUwNDMyIiwiRW1haWwiOiJwYXR5dWtvdkBiaW5ub3BoYXJtLnJ1IiwiSWQiOiJkNzVhOGQ4OS03MDVmLTExZTctYmVmYi0wMDUwNTY4YzAwMDciLCJQb3NpdGlvbiI6Ilx1MDQyNFx1MDQzOFx1MDQzZFx1MDQzMFx1MDQzZFx1MDQ0MVx1MDQzZVx1MDQzMlx1MDQ0Ylx1MDQzOSBcdTA0M2NcdTA0MzVcdTA0M2RcdTA0MzVcdTA0MzRcdTA0MzZcdTA0MzVcdTA0NDAiLCJMb2dpbiI6InBhdHl1a292IiwiUHVyY2hhc2UiOnsiQWRtaW4iOmZhbHNlLCJXb3JrZXIiOmZhbHNlLCJTZWN1cml0eSI6ZmFsc2V9LCJSZWNydWl0bWVudCI6eyJBZG1pbiI6ZmFsc2UsIldvcmtlciI6ZmFsc2UsIlNlY3VyaXR5IjpmYWxzZX19.eMCVITyPrVKRzbFoTEuwFPzyTg45_n32qw-C19LOuV4')
// stepanov
//window.localStorage.setItem('issuesToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXF1ZXN0cyIsImlhdCI6MTUxNTc3MDk4OSwiZXhwIjoxNTE1ODY3NzU3LCJhdWQiOiJwb3J0YWwuYmlubm9waGFybS5ydSIsInN1YiI6InN0ZXBhbm92QGJpbm5vcGhhcm0ucnUiLCJHaXZlbk5hbWUiOiJcdTA0MTBcdTA0M2JcdTA0MzVcdTA0M2FcdTA0NDFcdTA0MzBcdTA0M2RcdTA0MzRcdTA0NDAiLCJTdXJuYW1lIjoiXHUwNDIxXHUwNDQyXHUwNDM1XHUwNDNmXHUwNDMwXHUwNDNkXHUwNDNlXHUwNDMyIiwiRW1haWwiOiJzdGVwYW5vdkBiaW5ub3BoYXJtLnJ1IiwiSWQiOiI2ODY3N2IzZC1jNWJhLTExZTYtODA1Ny0wMDUwNTY4YzAwMDciLCJQb3NpdGlvbiI6Ilx1MDQxNFx1MDQzOFx1MDQ0MFx1MDQzNVx1MDQzYVx1MDQ0Mlx1MDQzZVx1MDQ0MCBcdTA0MzRcdTA0MzVcdTA0M2ZcdTA0MzBcdTA0NDBcdTA0NDJcdTA0MzBcdTA0M2NcdTA0MzVcdTA0M2RcdTA0NDJcdTA0MzAgXHUwNDNlXHUwNDMxXHUwNDM1XHUwNDQxXHUwNDNmXHUwNDM1XHUwNDQ3XHUwNDM1XHUwNDNkXHUwNDM4XHUwNDRmIFx1MDQzYVx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzMCIsIkxvZ2luIjoic3RlcGFub3YiLCJQdXJjaGFzZSI6eyJBZG1pbiI6ZmFsc2UsIldvcmtlciI6ZmFsc2UsIlNlY3VyaXR5IjpmYWxzZX0sIlJlY3J1aXRtZW50Ijp7IkFkbWluIjpmYWxzZSwiV29ya2VyIjpmYWxzZSwiU2VjdXJpdHkiOmZhbHNlfX0.UJLUkZok1nFRCIrIljUpCS6m5780tMxt7YIwV8RZp0U')
// volkov
//window.localStorage.setItem('issuesToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXF1ZXN0cyIsImlhdCI6MTUwMjk2MzAyMywiZXhwIjoxNTAzMDU5NzkxLCJhdWQiOiJwb3J0YWwuYmlubm9waGFybS5ydSIsInN1YiI6IlZvbGtvdkBiaW5ub3BoYXJtLnJ1IiwiR2l2ZW5OYW1lIjoiXHUwNDEyXHUwNDM4XHUwNDNhXHUwNDQyXHUwNDNlXHUwNDQwIiwiU3VybmFtZSI6Ilx1MDQxMlx1MDQzZVx1MDQzYlx1MDQzYVx1MDQzZVx1MDQzMiIsIkVtYWlsIjoiVm9sa292QGJpbm5vcGhhcm0ucnUiLCJJZCI6ImI4YTgwY2EwLTU3YzMtMTFlMC1iOWU5LTAwNTA1Njg5MjVmMyIsIlBvc2l0aW9uIjoiXHUwNDFkXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNiXHUwNDRjXHUwNDNkXHUwNDM4XHUwNDNhIFx1MDQzZVx1MDQ0Mlx1MDQzNFx1MDQzNVx1MDQzYlx1MDQzMCBcdTA0NDFcdTA0M2RcdTA0MzBcdTA0MzFcdTA0MzZcdTA0MzVcdTA0M2RcdTA0MzhcdTA0NGYiLCJMb2dpbiI6IlZvbGtvdlZBIiwiUHVyY2hhc2UiOnsiQWRtaW4iOnRydWUsIldvcmtlciI6dHJ1ZSwiU2VjdXJpdHkiOmZhbHNlfSwiUmVjcnVpdG1lbnQiOnsiQWRtaW4iOmZhbHNlLCJXb3JrZXIiOmZhbHNlLCJTZWN1cml0eSI6ZmFsc2V9fQ.BcBKUWz2aurNWqARUfxrcKn48WG-iV_4Guko_9in1Sc')
} else {
  const userToken = document.getElementById('user_token')
  if (userToken) {
    window.localStorage.setItem('issuesToken', userToken.value)
  }
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
try { injectTapEventPlugin() } catch (e) { console.log(e) }
// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')
let el = document.querySelector('tr.bx-layout-inner-inner-top-row')
if (el) {
  $(el).remove()
}

let render = () => {
  const routes = require('./routes/index').default(store)
  ReactDOM.render(
      <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
if (process.env.NODE_ENV) {
  if (window.devToolsExtension) {
    // window.devToolsExtension.open();
  }
}

// This code is excluded from production bundle
if (process.env.NODE_ENV) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
