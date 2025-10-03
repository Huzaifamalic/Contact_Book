// 📦 CDN se supabase import karo
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Supabase credentials
const supabaseUrl = "https://aedwolaacbnmksawzvhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZHdvbGFhY2JubWtzYXd6dmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDEwNDYsImV4cCI6MjA3NDQ3NzA0Nn0.H4rbASkdViJt5_-ZRxKNXckYg_-3DvKWAx9pAaHRJJY";

const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ DOM elements
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const emailInput = document.getElementById("email");

const saveButton = document.querySelector(".btn_col2");
const cealerButton = document.querySelector(".btn_col1");

// ✅ Save Button click
saveButton.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const number = numberInput.value.trim();
  const email = emailInput.value.trim();

  if (name && number && email) {
    const { data, error } = await supabase
      .from("Contact_Book_user_db")
      .insert([{ Name: name, Number: number, Email: email }]);

    if (error) {
      console.error("❌ Error inserting data:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to save contact. Please try again!",
      });
    } else {
      console.log("✅ Data inserted successfully:", data);
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Contact saved successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      // ✅ Inputs clear karo
      nameInput.value = "";
      numberInput.value = "";
      emailInput.value = "";
    }
  } else {
    Swal.fire({
      icon: "warning",
      title: "Missing Info",
      text: "Please fill in all fields before saving.",
    });
  }
});

// ✅ Connection test
async function testConnection() {
  const { data, error } = await supabase
    .from("Contact_Book_user_db")
    .select("*")
    .limit(1);

  if (error) {
    console.error("❌ Error:", error.message);
    Swal.fire({
      icon: "error",
      title: "Connection Failed",
      text: "Unable to connect to Supabase.",
    });
  } else {
    console.log("✅ Connected! Data:", data);
  }
}
testConnection();

// ✅ Fetch all data (test)
const { data, error } = await supabase
  .from("Contact_Book_user_db")
  .select("*");

console.log("Data:", data);
console.log("Error:", error);

for (let i = 0; i < data.length; i++) {
  console.log(data[i].Name);
}

// ✅ Clear Button click
cealerButton.addEventListener("click", () => {
  nameInput.value = "";
  numberInput.value = "";
  emailInput.value = "";

  Swal.fire({
    icon: "info",
    title: "Cleared",
    text: "All input fields have been cleared.",
    timer: 1200,
    showConfirmButton: false,
  });
});
