provider "aws" {
  region = "us-east-1"
}

# data "aws_ami" "web_ami" {
#   most_recent = true

#   name_regex = "packer-ubu-aws-app"
#   owners = ["self"]
# }

# data "aws_ami" "db_ami" {
#   most_recent = true

#   name_regex = "packer-ubu-aws-mongo"
#   owners = ["self"]
# }

# data "template_file" "userdata" {
#   template = "${file("./user_data.tpl")}"

#   vars {
#     db_host = "${aws_instance.mongo.private_ip}"
#   }
# }

# resource "aws_instance" "mongo" {
#   ami = "${data.aws_ami.db_ami.id}"
#   instance_type = "t2.micro"
#   availability_zone = "${var.availability_zone}"

#   key_name = "packer-ssh"

#   vpc_security_group_ids = ["${aws_security_group.mongo.id}"]

#   tags {
#     Name = "terraform-packer-database"
#   }
# }

# resource "aws_instance" "web" {
#   ami = "${data.aws_ami.web_ami.id}"
#   instance_type = "t2.micro"
#   availability_zone = "${var.availability_zone}"

#   user_data = "${data.template_file.userdata.rendered}"

#   key_name = "packer-ssh"

#   vpc_security_group_ids = ["${aws_security_group.web.id}"]

#   tags {
#     Name = "terraform-packer-web"
#   }
# }

# resource "aws_security_group" "web" {
#   name = "terraform-web-ingress"

#   ingress {
#     from_port = "${var.app_port}"
#     to_port = "${var.app_port}"
#     protocol = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#     from_port = 22
#     to_port = 22
#     protocol = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   egress {
#     from_port = 0
#     to_port = 0
#     protocol = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# resource "aws_security_group" "mongo" {
#   name = "terraform-db-ingress"

#   ingress {
#     from_port = "${var.mongo_port}"
#     to_port = "${var.mongo_port}"
#     protocol = "tcp"
#     security_groups = ["${aws_security_group.web.id}"]
#   }

#   ingress {
#     from_port = 22
#     to_port = 22
#     protocol = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#     from_port = -1
#     to_port = -1
#     protocol = "icmp"
#     security_groups = ["${aws_security_group.web.id}"]
#   }

#   egress {
#     from_port = 0
#     to_port = 0
#     protocol = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

variable "mongo_port" {
  description = "The port the server will use for all DB connections"
  default = 27017
}

variable "app_port" {
  description = "The port the server will use for HTTP requests"
  default = 5000
}

variable "availability_zone" {
  description = "The AZ to put instances in"
  default = "us-east-1a"
}

# output "public_app_ip" {
#   value = "${aws_instance.web.public_ip}"
# }

# output "mongo_internal_ip" {
#   value = "${aws_instance.mongo.private_ip}"
# }
