
const nodemailer = require("nodemailer");
const cartModel = require("../models/cartModel")
const productModel = require("../models/productModel")
const confirmOrderModel = require('../models/confirmOrderModel');
async function confirmOrder(req,res)
{
    let customerId = req.user._id
   
    let  {name,email,company,streetAddress,town,state,postCode,phone} = req.body
    let completeCart =  JSON.parse(req.body.completeCart);
    
    // product details code
    let tableRows = '';
    completeCart.forEach(product => {
      tableRows += `
        <tr>
          <td>${product.productName}</td>
          <td>${product.productQty}</td>
          <td>${product.productPrice}</td>
          <td>${product.productQty * product.productPrice}</td>
        </tr>
      `;
    });

    let productDetailMessage = `<h2>Product Deatils</h2><br><table border="1" cellpadding="5" cellspacing="0">
    
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                           ${tableRows}
                        </tbody>
                    </table>`
   // product details code end
                  
                    

    // customer details code 
    let customerDetailMessage = `<b>Order Details</b> <br><br>
            
                <b>Customer Name: </b>${name}<br>
                <b>Customer Email:</b> ${email}<br>
                <b>Company: </b>${company}<br>
                <b>Street Address:</b> ${streetAddress}<br>
                <b>Town/City:</b> ${town}<br>
                <b>State:</b> ${state}<br>
                <b>Post Code:</b> ${postCode}<br>
                <b>Phone:</b> ${phone}<br><br><br>`
    // customer details code end


    const combinedMessage = `
    <html>
      <body>
        
        ${customerDetailMessage}
        ${productDetailMessage}
      </body>
    </html>
  `;



    try {
        let orderDone = await confirmOrderModel.create({
            customerId,name,email,company,streetAddress,town,state,postCode,phone
        })

         if(orderDone)
            {
                // set sender details 
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: 587,
                    secure: false, // Use `true` for port 465, `false` for all other ports
                    auth: {
                        user: "sumitkumarsahu141@gmail.com",
                        pass: "cuhm fujp vunl qorl",
                    },
                    });
                
                    // send mail to customer and owner
                    // async..await is not allowed in global scope, must use a wrapper
                    async function main() {
                    // send mail with defined transport object
                    // send mail to the customer
                    const info1 = await transporter.sendMail({
                        from: '"EWV Team 👻" <sumitkumarsahu141@gmail.com>', // sender address
                        to: `${email}`, // list of receivers
                        subject: "Order Details ✔", // Subject line
                        html: `${combinedMessage}`, // html body
                        // text: `${message}`, // plain text body
                    });
                    // send mail to the Owner
                    let ownerEmail = "nikitasahu141@gmail.com";
                    const info2 = await transporter.sendMail({
                        from: '"EWV Team 👻" <sumitkumarsahu141@gmail.com>', // sender address
                        to: `${ownerEmail}`, // list of receivers
                        subject: "New Order ✔", // Subject line
                        html: `${combinedMessage}`, // html body
                        // text: `${message}`, // plain text body
                    });


                    res.send("Order done")
                    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
                    }

                    main().catch(console.error);

            }else{
                  res.status(400).send("Data not insert")
            }
             


        // cuhm fujp vunl qorl 
    } catch (error) {
        res.status(400).send(error);
    }
   
}
module.exports = confirmOrder