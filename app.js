// 📦 CDN se supabase import karo
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Supabase credentials
const supabaseUrl = "https://aedwolaacbnmksawzvhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZHdvbGFhY2JubWtzYXd6dmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDEwNDYsImV4cCI6MjA3NDQ3NzA0Nn0.H4rbASkdViJt5_-ZRxKNXckYg_-3DvKWAx9pAaHRJJY";

const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ DOM elements ko variables me lo (❌ .value nahi lena yahan)
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const emailInput = document.getElementById("email");

const saveButton = document.querySelector(".btn_col2");
const cealerButton = document.querySelector(".btn_col1");


// ✅ Button click par data insert karega
saveButton.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const number = numberInput.value.trim();
  const email = emailInput.value.trim();

  if (name && number && email) {
    const { data, error } = await supabase
      .from("Contact_Book_user_db") // ✅ Table ka sahi naam
      .insert([{ Name: name, Number: number, Email: email }]);

    if (error) {
      console.error("❌ Error inserting data:", error);
      alert("Failed to save contact. Please try again.");
    } else {
      console.log("✅ Data inserted successfully:", data);
      alert("Contact saved successfully!");
      // ✅ Inputs clear karo
      nameInput.value = "";
      numberInput.value = "";
      emailInput.value = "";
    }
  } else {
    alert("Please fill in all fields.");
  }
});

// ✅ Connection test function
async function testConnection() {
  const { data, error } = await supabase
    .from("Contact_Book_user_db")
    .select("*")
    .limit(1);

  if (error) {
    console.error("❌ Error:", error.message);
  } else {
    console.log("✅ Connected! Data:", data.name);
  }
}

testConnection();


const { data, error } = await supabase
  .from('Contact_Book_user_db')
  .select('*');

console.log("Data:", data);
console.log("Error:", error);
for (let i = 0; i < data.length; i++) {
  const contact = data[i];
  console.log(data[i].Name);
}
cealerButton.addEventListener("click", () => {
  nameInput.value = "";
  numberInput.value = "";
  emailInput.value = "";
});


