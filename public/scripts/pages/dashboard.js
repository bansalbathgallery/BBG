///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// show list on map //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

// $.ajax({
//     url: '/api/v1/mapImages',
//     type: 'GET',
//     success: function (result) {
//         if (result.code == 401) {
//             toast('danger', 'Error', result.message)
//         } else {
//             google.maps.event.addDomListener(window, 'load', showPosition(result.data));
//         }
//     },
//     error: function (error) {
//         toast('danger', 'Error', error)
//     }
// }); 

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// show images on map ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

// async function showPosition(list) {
//     const mapOptions = {
//         zoom: 17,
//         streetViewControl: false,
//         // scrollwheel:false,
//         center: new google.maps.LatLng(30.7046, 76.7179),
//         mapTypeId: 'roadmap'
//     };
//     const map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
//     await Promise.all(list.map(async data => {
//             const lat = data.lat;
//             const lng = data.lng;
//             const img = data.image;
//             const myLatLng = new google.maps.LatLng(lat, lng);
//            // let mkr = `mk${index}`;
//             const mkr = new google.maps.Marker({
//                 draggable: true,
//                 position: myLatLng,
//                 map: map,
//                 icon: {
//                     url: img,
//                     scaledSize: new google.maps.Size(200, 200)
//                 },
//             });
//             google.maps.event.addListener(mkr, 'dragend', function (event) {
//                 const latitude = this.getPosition().lat().toFixed(6);
//                 const longitude = this.getPosition().lng().toFixed(6);
//                 // console.log(latitude, longitude)
//                 // let newLatLng = new google.maps.LatLng(latitude, longitude);
//                 // map.panTo(newLatLng);  
//             });
//         })
//     )
// }


// const canvas = document.getElementById('canvas');
// const context = canvas.getContext("2d");
// const image = new Image();
// image.src = "http://www.clker.com/cliparts/w/O/e/P/x/i/map-marker-hi.png";
// const userIcon = new Image();
// userIcon.src= "images/useroncanvas.png";
//   $.ajax({
//     url: '/api/v1/canvasSampleData',
//     type: 'GET',
//     success: function (result) {
//         if (result.code == 401) {
//             toast('danger', 'Error', result.message)
//         } else {
//             base_image = new Image();
//             base_image.src = result.data.image;
//             base_image.onload = function(){
//               context.drawImage(base_image, 0, 0);
//               const beackonPosition = result.data.position;
//               const userPosition = result.data.userPosition; 
//             //   context.beginPath();              
//             //   context.lineWidth = "2";
//             //   context.strokeStyle = "grey";  
//             //   context.moveTo(beackonPosition[0].xPos, beackonPosition[0].yPos);

//               for (let i = 0; i < beackonPosition.length; i++) {
//                const x = beackonPosition[i].xPos;
//                const y = beackonPosition[i].yPos;
//                context.drawImage(image, x, y,20,20);
              
    
//             //    context.lineTo(beackonPosition[i].xPos, beackonPosition[i].yPos);

//             //    context.stroke();  
//             }  
//              for(let i=0; i<userPosition.length;i++) {
//                 const x = userPosition[i].xPos;
//                 const y = userPosition[i].yPos;
//                 context.drawImage(userIcon, x, y,20,20);
//                 var markerText = `${userPosition[i].name}`;

//                 // Draw a simple box so you can see the position
//                 var textMeasurements = context.measureText(markerText);
//                 context.fillStyle = "#666";
//                 context.globalAlpha = 0.7;
//                 context.fillRect(userPosition[i].xPos , userPosition[i].yPos - 15, textMeasurements.width, 20);
//                 context.globalAlpha = 1;
        
//                 // Draw position above
//                 context.fillStyle = "#000";
//                 context.fillText(markerText, userPosition[i].xPos, userPosition[i].yPos);
//              }
//            }
//            canvas.addEventListener('click', (e) => {
//             const pos = {
//               x: e.clientX,
//               y: e.clientY
//             };
            
//             alert(JSON.stringify(pos))
//             // circles.forEach(circle => {
//             //   if (isIntersect(mousePoint, circle)) {
//             //     alert('click on circle: ' + circle.id);
//             //   }
//             // });
//           });

//         }
//     },
//     error: function (error) {
//         toast('danger', 'Error', error)
//     }
// });   


(function($) {

  $.ajax({
    url: '/api/v1/buildingList',
    type: 'GET',
    success: function (result) {
      if (result.code == 200) {
        const buildingList = result.data;
        for (let i=0;i< buildingList.length;i++) {
          $("#buildingList").append(`<option value="${buildingList[i].id}">${buildingList[i].name}</option>`);
        }
      } else {
        toast('danger', 'Error', result.message) 
      }
    },
    error: function (error) {
      toast('danger', 'Error', error)
    }
  })

  // $.ajax({
  //   url: '/api/v1/canvasSampleData',
  //   type: 'GET',
  //   success: function (result) {
  //     if (result.code == 401) {
  //       toast('danger', 'Error', result.message)
  //     } else {
  //       const beackonPosition = result.data.position;
  //       const userPosition = result.data.userPosition;
  

  //     const imageNotes = $("#image").imgNotes()
  //     imageNotes.imgNotes("import", beackonPosition);
  //     imageNotes.imgNotes("import", userPosition);

  //     }
  //   },
  //   error: function (error) {
  //     toast('danger', 'Error', error)
  //   }
  // })


    // $(window).load(function() {

    //   var $img = $("#image").imgNotes({
    //     onEdit: function(ev, elem) {
    //       var $elem = $(elem);
    //       $('#NoteDialog').remove();
    //       return $('<div id="NoteDialog"></div>').dialog({
    //         title: "Note Editor",
    //         resizable: false,
    //         modal: true,
    //         height: "300",
    //         width: "450",
    //         position: { my: "left bottom", at: "right top", of: elem},
    //         buttons: {
    //           "Save": function() {
    //             var txt = $('textarea', this).val();
    //             $elem.data("note").note = txt;
    //             console.log('save',$elem.data("note"))
    //             $(this).dialog("close");
    //           },
    //           "Delete": function() {
    //             console.log('delete',$elem.data("note"))

    //             $elem.trigger("remove");
    //             $(this).dialog("close");
    //           },
    //           Cancel: function() {
    //             $(this).dialog("close");
    //           }
    //         },
    //           open: function() {
    //             $(this).css("overflow", "hidden");
    //             var textarea = $('<textarea id="txt" style="height:100%; width:100%;">');
    //             $(this).html(textarea);
    //             textarea.val($elem.data("note").note);
    //           }
    //       });
    //     }
    //   });
      
      

    // });
})(jQuery);



function floorList(buildingId) {
  $.ajax({
    url: `/api/v1/floorList/${buildingId}`,
    type: 'GET',
    success: function (result) {
      if (result.code == 200) {
        const floorList = result.data;
        for (let i=0;i< floorList.length;i++) {
          $("#floorList").append(`<option value="${floorList[i].id}" img="${floorList[i].image}">${floorList[i].name}</option>`);
        }
      } else {
        toast('danger', 'Error', result.message)
      }
    },
    error: function (error) {
      toast('danger', 'Error', error)
    }
  })
}

function showImage() {
 
  const imageSrc= $("#floorList option:selected").attr("img");
  const floorId= $("#floorList").val();
  $('#floorImage').append(`<img src="${imageSrc}" id="image">`);
  setTimeout(() => {
    $.ajax({
      url: `/api/v1/beaconList/${floorId}`,
      type: 'GET',
      success: function (result) {
  
        if (result.code == 200) {
          const beackonPosition = result.data;
          // const userPosition = result.data.userPosition;
     
   
         const imageNotes = $("#image").imgNotes()
         imageNotes.imgNotes("import", beackonPosition);
        // imageNotes.imgNotes("import", userPosition);
        } else {
          toast('danger', 'Error', result.message)

        }
      },
      error: function (error) {
        toast('danger', 'Error', error)
      }
    })
  }, 200);


}