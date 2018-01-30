 function Controles(player){

 addEventListener("keydown", function(e){
        switch (e.keyCode) {
          case 65://letra A
            player.vx = -100;
            break;
          case 68:// letra D
            player.vx = 100;
            break;
          default:
            break;
        }
      });
addEventListener("keyup", function(e){
        switch (e.keyCode) {
        case 65://letra A
            player.vx = 0;
            break;
          case 68:// letra D
            player.vx = 0;
            break;
          default:
            break;
        }
      });
}